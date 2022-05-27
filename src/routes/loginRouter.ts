import { Router, Request, Response, NextFunction } from "express";

interface RequestWithBody extends Request{
    body: { [key: string]: string | undefined }
}

const router = Router()

const requireAuth = (req: RequestWithBody, res: Response, next: NextFunction) => {
    if (req.session?.loggedIn) {
        next()
        return
    } else {
        res.send('Not permitted, my dude')
    }
}

router.get('/login', (req: Request, res: Response) => {
    res.send(`
        <form method="post">
            <div>
                <label for="Email">Email</label>
                <input name="email">
            </div>
            <div>
                <label for="Password">Password</label>
                <input name="password" type="password">
            </div>
            <button>Submit</button>
        </form>
    `)
})

router.post('/login', (req: RequestWithBody, res: Response) => {
    const { email, password } = req.body

    if (email && password && email === '0' && password === '0') {
        req.session = { loggedIn: true }
        res.redirect('/')
    }
    else res.send('Wrong')
    
})

router.get('/', (req: RequestWithBody, res: Response) => {
    if (req.session?.loggedIn) {
        res.send(`
            <p>Logged In</p>
            <a href="/logout">Logout</a>
        `)
    } else {
        res.send(`
            <p>Logged Out</p>
            <a href="/login">Login</a>
        `)
    }
})

router.get('/logout', (req: RequestWithBody, res: Response) => {
    req.session = undefined
    res.redirect('/')
})

router.get('/protected', requireAuth, (req: RequestWithBody, res: Response) => {
    res.send('welcome dude')
})

export { router }