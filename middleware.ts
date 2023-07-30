import {withAuth} from "next-auth/middleware";
export default withAuth({
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
    ]
};
