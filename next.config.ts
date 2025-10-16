import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';

// Ensure Turbopack uses the repository root (prevents inferring the user's home dir)
// Some environments (or local machines) may have extra lockfiles that cause
// Next/Turbopack to pick the wrong workspace root. Setting `turbopack.root`
// ensures consistent behavior in CI (like Vercel).
const nextConfig: NextConfig & Record<string, any> = {
	turbopack: {
		// Turbopack expects an absolute path. Use the current working directory which
		// will be the project root in most environments (including Vercel).
		root: path.resolve(process.cwd()),
	},
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);