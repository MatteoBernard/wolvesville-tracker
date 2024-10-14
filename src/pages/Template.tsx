import {Footer, Header} from "../component";

type TemplateProps = {
    children: React.ReactNode;
}

export const Template = ({children}: TemplateProps) => {
    return (
        <>
            <Header />
            <main className={"flex-grow"}>
                {children}
            </main>
            <div  />
            <Footer />
        </>
    )
}