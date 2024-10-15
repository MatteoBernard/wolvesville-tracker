import {Footer, Header} from "../component";

type TemplateProps = {
    children: React.ReactNode;
}

export const Template = ({children}: TemplateProps) => {
    return (
        <>
            <Header />
            <main className={"flex-grow justify-center content-center"}>
                {children}
            </main>
            <div  />
            <Footer />
        </>
    )
}