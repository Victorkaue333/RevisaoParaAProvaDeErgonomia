document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Seletores de Elementos ---
    const header = document.querySelector("header");
    const nav = document.querySelector("nav");
    const navLinks = document.querySelectorAll("nav a");
    const sections = document.querySelectorAll("main section");
    
    // (Opcional) Adicione o HTML do botão "Voltar ao Topo" antes de </body>
    // <a href="#" class="back-to-top"><i class="bi bi-arrow-up"></i></a>
    const backToTopButton = document.querySelector(".back-to-top");

    const offset = window.innerHeight / 3;
    let currentActiveId = ""; // Para rastrear a seção ativa e evitar repetições

    // --- 2. Função Principal de Rolagem (Disparada no 'scroll') ---
    const onScroll = () => {
        const scrollPosition = window.scrollY;

        // --- EFEITO 1: Sombra do Cabeçalho ---
        if (header) { // Verifica se o header existe
            if (scrollPosition > 10) {
                header.classList.add("header-scrolled");
            } else {
                header.classList.remove("header-scrolled");
            }
        }

        // --- EFEITO 2: Botão "Voltar ao Topo" ---
        if (backToTopButton) { // Verifica se o botão existe
            if (scrollPosition > 300) { // Mostra o botão após rolar 300px
                backToTopButton.classList.add("visible");
            } else {
                backToTopButton.classList.remove("visible");
            }
        }

        // --- LÓGICA 3: Scroll Spy (Encontrar Seção Ativa) ---
        let newActiveId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollPosition >= sectionTop - offset) {
                newActiveId = section.getAttribute("id");
            }
        });

        // --- EFEITO 3: Atualizar Links (Apenas se a seção mudar) ---
        if (newActiveId !== currentActiveId) {
            currentActiveId = newActiveId;
            updateActiveLinks(currentActiveId);
        }
    };

    // --- 3. Função Auxiliar: Atualizar Links do Menu ---
    const updateActiveLinks = (activeId) => {
        let activeLinkElement = null;

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${activeId}`) {
                link.classList.add("active");
                activeLinkElement = link;
            }
        });

        // --- EFEITO 4: Centralizar Link Ativo no Menu Móvel ---
        // Verifica se o link ativo existe e se o menu está no modo 'relative' (móvel)
        if (activeLinkElement && getComputedStyle(nav).position === 'relative') {
            const navRect = nav.getBoundingClientRect();
            const linkRect = activeLinkElement.getBoundingClientRect();

            // Calcula a posição para centralizar o link
            const scrollLeft = nav.scrollLeft + linkRect.left - navRect.left - (navRect.width / 2) + (linkRect.width / 2);

            nav.scrollTo({
                left: scrollLeft,
                behavior: "smooth"
            });
        }
    };

    // --- 4. Listeners de Eventos ---

    // Listener de Rolagem
    window.addEventListener("scroll", onScroll);

    // Listener para o botão "Voltar ao Topo"
    if (backToTopButton) {
        backToTopButton.addEventListener("click", (e) => {
            e.preventDefault(); // Impede o link de adicionar '#' na URL
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // --- 5. Execução Inicial ---
    onScroll(); // Chama uma vez no carregamento para definir o estado inicial

});