# Tauri Video Player App

A demo application built with Tauri 2.0, Next.js, and the Tauri Opener plugin to play videos in VLC player.

## Prerequisites

- Node.js (v16 or later)
- Rust (latest stable)
- VLC Media Player installed

## Setup

1. Install dependencies:
```bash
npm install
```

2. Add the opener plugin:
```bash
npm run tauri add opener
```

This command automatically:
- Adds the plugin to your Rust dependencies
- Configures the plugin in `tauri.conf.json`
- Installs the required npm package

3. Configure permissions in `src-tauri/capabilities/default.json`:
```json
{
  "permissions": [
    "core:default",
    "opener:default",
    "opener:allow-open-url",
    "opener:allow-open-path",
    "opener:allow-default-urls"
  ]
}
```

## Usage Example

Here's how to use the opener plugin in your React component:

```typescript
import { openPath } from '@tauri-apps/plugin-opener';

const handleOpenVLC = async () => {
  try {
    setIsLoading(true);
    setError(null);
    
    await openPath(videoUrl, '-a VLC');
    console.log('Video opened in VLC');
  } catch (err: unknown) {
    console.error('Failed to open video:', err);
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('Failed to open video');
    }
  } finally {
    setIsLoading(false);
  }
};
```

## Development

Start the development server:
```bash
npm run tauri:dev
```

## Notes

- Make sure VLC is installed on your system
- Uses `openPath` with `-a VLC` flag for macOS
