export default function Footer() {
  return (
    <footer className="bg-[#303434] text-white font-bold py-6 mt-10 border-t">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Governo Municipal com Colaboração de Nome. Todos os direitos reservados.</p>
        
        <div className="flex gap-4 mt-2 md:mt-0 text-sm">
          <a href="/sobre" className="hover:underline">Sobre</a>
          <a href="/contato" className="hover:underline">Contato</a>
          <a href="/termos" className="hover:underline">Termos</a>
        </div>
      </div>
    </footer>
  );
}
