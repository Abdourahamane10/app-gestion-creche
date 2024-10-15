import footerStyle from "./Footer.module.css"
export default function Footer() {
    const currentYear = new Date().getFullYear();
  return (
    <>
    <footer className={footerStyle.footer}>
        <p>© {currentYear} - tous droits reservés !</p>
    </footer>
    </>
  )
}