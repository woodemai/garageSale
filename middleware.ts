import {withAuth} from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
export const config = {
    matcher: [
        '/main/:path*',
        '/profile/:path*',
        '/storage/:path*',
        '/categories/:path*',
        '/settings/:path*',
        '/create-item/:path*',
        '/((?!api|_next|.*\\..*).*)',
    ]
};
export default withAuth({
    pages: {
        signIn: '/'
    }
});
export const middleware = createMiddleware({locales: ['en', 'ru'], defaultLocale: 'en'});
