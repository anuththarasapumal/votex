import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'VoteX',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    "allowNavigation": [
      "https://votexback.geoinfobox.com/"
    ]
  }
};

export default config;
