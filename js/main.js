// Aguarda o DOM ser totalmente carregado
document.addEventListener("DOMContentLoaded", () => {
    
    // Seleciona todos os links do menu e as seções de conteúdo
    const navLinks = document.querySelectorAll("nav a");
    const sections = document.querySelectorAll("main section");

    // Função para atualizar o link ativo
    const updateActiveLink = () => {
        let currentSectionId = "";

        // Itera sobre as seções para encontrar a que está mais próxima do topo da viewport
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // O "100" é um deslocamento (offset) para ativar o link um pouco antes
            // de a seção chegar exatamente no topo, melhorando a experiência.
            if (window.scrollY >= sectionTop - sectionHeight / 3 - 100) {
                currentSectionId = section.getAttribute("id");
            }
        });

        // Remove a classe 'active' de todos os links
        navLinks.forEach(link => {
            link.classList.remove("active");
            
            // Adiciona a classe 'active' ao link que corresponde à seção visível
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    };

    // Adiciona o event listener ao rolar a página
    window.addEventListener("scroll", updateActiveLink);
    
    // Chama a função uma vez no carregamento para definir o estado inicial
    updateActiveLink();

});
