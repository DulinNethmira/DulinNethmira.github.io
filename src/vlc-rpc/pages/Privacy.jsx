import './Pages.css';

export default function Privacy() {
  return (
    <div className="vlc-page-container">
      <div className="vlc-page-header">
        <h1 className="vlc-heading-display">Privacy Policy</h1>
        <p className="vlc-body-large">Your media belongs to you. Here's exactly how we handle your data.</p>
      </div>

      <div className="vlc-page-content">
        <section className="vlc-content-section">
          <h2>1. Local Operation & Data Storage</h2>
          <p>
            VLC RPC is designed to operate primarily on your local machine. All your watch history, settings, and generated analytics are stored securely in a local SQLite database on your own hard drive. We do not maintain any central servers or databases that collect your media viewing habits.
          </p>
        </section>

        <section className="vlc-content-section">
          <h2>2. Authentication Handling</h2>
          <p>
            Authentication is handled entirely locally, and VLC RPC does not use a separate backend to proxy your AniList credentials. When you authenticate with AniList, the application spins up a temporary local callback server (`127.0.0.1`) to securely receive the OAuth 2.0 authorization code directly from AniList. Your access tokens are stored securely in your local SQLite database and are never transmitted to any third-party analytics or intermediary servers.
          </p>
        </section>

        <section className="vlc-content-section">
          <h2>3. External Integrations</h2>
          <p>VLC RPC only communicates with external services that you explicitly authorize:</p>
          <ul>
            <li><strong>Discord:</strong> The application uses the local Discord IPC socket to update your Rich Presence. No data is sent to Discord's web APIs.</li>
            <li><strong>AniList:</strong> The application makes direct HTTPS requests to the official AniList GraphQL API using your locally stored access token to synchronize your watch progress and fetch metadata.</li>
            <li><strong>GitHub:</strong> The application may make unauthenticated requests to the GitHub API (e.g., `api.github.com/repos/...`) solely to check for new releases and display version information on the dashboard.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
