export default function Footer() {
    return (
      <footer className="px-4 py-6 text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} <a href="https://thien.tv" target="_blank" rel="noreferrer">thien.tv</a>
      </footer>
    )
  }