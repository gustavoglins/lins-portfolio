import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';

const nextConfig: NextConfig & Record<string, any> = {
	turbopack: {
		root: path.resolve(process.cwd()),
	},
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);