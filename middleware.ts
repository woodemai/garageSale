import {withAuth} from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";

 withAuth({
    pages: {
        signIn: '/'
    }
});
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
export default createMiddleware({locales: ['en', 'ru'], defaultLocale: 'en'});
