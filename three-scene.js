// ===== THREE.JS 3D LAYER =====
// Hero glassy blob + Skills 3D orbit
// Lazy-loaded, IntersectionObserver-paused, WebGL-detected

(function () {
  'use strict';

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- WebGL detection ---
  function hasWebGL() {
    try {
      var c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
    } catch (e) { return false; }
  }

  if (!hasWebGL() || REDUCED) {
    console.log('[three-scene] WebGL unavailable or reduced motion. Using fallback.');
    return;
  }

  // --- Shared config ---
  const DPR = Math.min(window.devicePixelRatio, 1.5); // Cap for performance

  // ==========================================================
  // 1. HERO 3D BLOB
  // ==========================================================
  function initHeroBlob() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'hero-3d-canvas';
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0;transition:opacity 1s ease;';
    hero.style.position = 'relative';
    hero.insertBefore(canvas, hero.firstChild);

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(DPR);
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    renderer.setClearColor(0x000000, 0);

    // Icosahedron with noise-based vertex displacement
    const geo = new THREE.IcosahedronGeometry(1.3, 4);
    const originalPositions = geo.attributes.position.array.slice();

    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#818cf8'),
      metalness: 0.1,
      roughness: 0.15,
      transmission: 0.6,
      thickness: 1.5,
      transparent: true,
      opacity: 0.7,
      envMapIntensity: 0.8,
      wireframe: false,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Lights
    const light1 = new THREE.DirectionalLight(0x818cf8, 1.5);
    light1.position.set(2, 3, 4);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xc084fc, 1);
    light2.position.set(-2, -1, 3);
    scene.add(light2);

    const ambient = new THREE.AmbientLight(0x818cf8, 0.3);
    scene.add(ambient);

    // Mouse tracking
    let mouseX = 0, mouseY = 0;
    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    });

    // Scroll-driven fade/scale (via GSAP if available)
    let scrollScale = 1;
    let scrollOpacity = 1;
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      const obj = { s: 1, o: 1 };
      gsap.to(obj, {
        s: 0.5, o: 0,
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 },
        onUpdate: function () { scrollScale = obj.s; scrollOpacity = obj.o; }
      });
    }

    // Simple noise function
    function noise3D(x, y, z) {
      return Math.sin(x * 1.5 + z) * Math.cos(y * 1.3 + z * 0.7) * 0.5 +
             Math.sin(x * 2.1 - z * 1.1) * Math.cos(y * 1.8 + z * 0.5) * 0.3;
    }

    // Animation loop
    let running = true;
    let clock = new THREE.Clock();

    function animate() {
      if (!running) return;
      requestAnimationFrame(animate);

      var t = clock.getElapsedTime();

      // Vertex displacement
      var positions = geo.attributes.position.array;
      for (var i = 0; i < positions.length; i += 3) {
        var ox = originalPositions[i];
        var oy = originalPositions[i + 1];
        var oz = originalPositions[i + 2];
        var n = noise3D(ox * 1.5, oy * 1.5, t * 0.5);
        var factor = 1 + n * 0.15;
        positions[i] = ox * factor;
        positions[i + 1] = oy * factor;
        positions[i + 2] = oz * factor;
      }
      geo.attributes.position.needsUpdate = true;
      geo.computeVertexNormals();

      // Rotation + mouse tilt
      mesh.rotation.y += 0.003;
      mesh.rotation.x += 0.001;
      mesh.rotation.y += mouseX * 0.002;
      mesh.rotation.x += mouseY * 0.002;

      // Scroll-driven transform
      mesh.scale.setScalar(scrollScale);
      canvas.style.opacity = scrollOpacity;

      renderer.render(scene, camera);
    }

    // IntersectionObserver to pause when off-screen
    var observer = new IntersectionObserver(function (entries) {
      running = entries[0].isIntersecting;
      if (running) animate();
    }, { threshold: 0.05 });
    observer.observe(hero);

    // Resize handler
    function onResize() {
      if (!canvas.offsetWidth || !canvas.offsetHeight) return;
      camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    }
    window.addEventListener('resize', onResize);

    // Fade in after a short delay
    setTimeout(function () { canvas.style.opacity = '1'; }, 500);

    // Cleanup reference
    window.__heroBlob = { dispose: function () {
      running = false;
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      canvas.remove();
    }};

    animate();
  }

  // ==========================================================
  // 2. SKILLS 3D SPHERE
  // ==========================================================
  function initSkillsSphere() {
    var container = document.getElementById('skills-orbit');
    if (!container) return;

    // Clear existing flat orbit content
    container.innerHTML = '';

    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'width:100%;height:100%;';
    container.appendChild(canvas);

    var scene = new THREE.Scene();
    var w = container.offsetWidth || 400;
    var h = container.offsetHeight || 400;
    var camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.z = 6;

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(DPR);
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);

    var skills = [
      'HTML5', 'CSS3', 'JavaScript', 'Premiere Pro', 'After Effects',
      'CapCut', 'Photoshop', 'Web Design', 'Video Editing', 'SEO',
      'UI/UX', 'Responsive', 'Modern Web', 'Animations'
    ];

    var group = new THREE.Group();
    scene.add(group);

    var sprites = [];
    var radius = 2.2;

    skills.forEach(function (skill, i) {
      var phi = Math.acos(-1 + (2 * i + 1) / skills.length);
      var theta = Math.sqrt(skills.length * Math.PI) * phi;

      // Create text sprite
      var cvs = document.createElement('canvas');
      var ctx = cvs.getContext('2d');
      cvs.width = 256;
      cvs.height = 64;
      ctx.clearRect(0, 0, 256, 64);

      // Background pill
      ctx.fillStyle = 'rgba(22, 22, 24, 0.85)';
      ctx.beginPath();
      ctx.roundRect(4, 8, 248, 48, 24);
      ctx.fill();
      ctx.strokeStyle = 'rgba(129, 140, 248, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(4, 8, 248, 48, 24);
      ctx.stroke();

      // Text
      ctx.fillStyle = '#818cf8';
      ctx.font = '600 22px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(skill, 128, 32);

      var texture = new THREE.CanvasTexture(cvs);
      texture.needsUpdate = true;

      var spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.9 });
      var sprite = new THREE.Sprite(spriteMat);

      sprite.position.set(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      );
      sprite.scale.set(1.8, 0.45, 1);

      group.add(sprite);
      sprites.push(sprite);
    });

    // Lights for the sphere area
    var light = new THREE.PointLight(0x818cf8, 0.5);
    light.position.set(0, 0, 5);
    scene.add(light);

    // Auto-rotate
    var autoSpeed = 0.003;
    var hoverSpeed = 0;
    var isDragging = false;
    var prevMouseX = 0;
    var dragVelocity = 0;

    container.addEventListener('mouseenter', function () { hoverSpeed = 0.008; });
    container.addEventListener('mouseleave', function () {
      hoverSpeed = 0;
      isDragging = false;
    });

    container.addEventListener('mousedown', function (e) {
      isDragging = true;
      prevMouseX = e.clientX;
    });
    window.addEventListener('mouseup', function () { isDragging = false; });
    container.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      var dx = e.clientX - prevMouseX;
      dragVelocity = dx * 0.01;
      prevMouseX = e.clientX;
    });

    // Animate
    var running = true;
    function animate() {
      if (!running) return;
      requestAnimationFrame(animate);

      if (isDragging) {
        group.rotation.y += dragVelocity;
        dragVelocity *= 0.95;
      } else {
        group.rotation.y += autoSpeed + hoverSpeed;
      }
      group.rotation.x = Math.sin(Date.now() * 0.0003) * 0.15;

      renderer.render(scene, camera);
    }

    // IntersectionObserver
    var obs = new IntersectionObserver(function (entries) {
      running = entries[0].isIntersecting;
      if (running) animate();
    }, { threshold: 0.05 });
    obs.observe(container);

    // Resize
    function onResize() {
      var w2 = container.offsetWidth;
      var h2 = container.offsetHeight;
      if (!w2 || !h2) return;
      camera.aspect = w2 / h2;
      camera.updateProjectionMatrix();
      renderer.setSize(w2, h2);
    }
    window.addEventListener('resize', onResize);

    animate();
  }

  // ==========================================================
  // INIT (lazy — after DOMContentLoaded)
  // ==========================================================
  function init() {
    // Delay slightly to not block first paint
    requestAnimationFrame(function () {
      initHeroBlob();
      initSkillsSphere();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
