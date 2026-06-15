export const SiteFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800/80 bg-gray-950">
      <div className="mx-auto max-w-3xl px-4 py-6">
        <p className="text-center text-xs leading-relaxed text-gray-600 sm:text-left">
          Plataforma de amigo secreto com consulta por CPF. Participantes acessam
          somente pelo link enviado pelo organizador.
        </p>

        <div className="mt-5 flex flex-col items-center gap-2 border-t border-gray-800/80 pt-5 text-xs text-gray-600 sm:flex-row sm:justify-between">
          <p>
            Adaptado por{' '}
            <span className="font-medium text-gray-400">Igor Zanella</span>
          </p>
          <p>© {year} Amigo Secreto</p>
        </div>
      </div>
    </footer>
  );
};
