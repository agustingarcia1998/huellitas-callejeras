export function getMenuItems(currentUser) {
  const isAdmin = currentUser?.role === "admin";
  const isLoggedIn = !!currentUser;

  const menu = [
    {
      section: "MENU",
      listItems: [
        { icon: "mdi-view-dashboard", text: "Dashboard", link: "/dashboard" },
        { icon: "mdi-dog", text: "Mascotas", link: "/" },
      ],
    },
    {
      section: "NOSOTROS",
      listItems: [
        { icon: "mdi-account-group", text: "Sobre Nosotros", link: "/about" },
      ],
    },
    {
      section: "ADOPCIONES",
      listItems: [
        {
          icon: "mdi-clipboard-check",
          text: "Requisitos de Adopción",
          link: "/require",
        },
      ],
    },
    {
      section: "FAQ",
      listItems: [{ icon: "mdi-help-circle", text: "FAQ", link: "/faq" }],
    },
  ];

  if (isAdmin) {
    menu.push({
      section: "ADMIN",
      listItems: [
        { icon: "mdi-plus-box", text: "Agregar nuevas mascotas", link: "/admin/add" },
        { icon: "mdi-delete", text: "Remover mascotas adoptadas", link: "/admin/remove" },
      ],
    });
  }

  // 👉 Insert the "ACCOUNT" section at the beginning
  const accountSection = isLoggedIn
    ? {
        section: "CUENTA",
        listItems: [
          { icon: "mdi-logout", text: "Cerrar Sesión", link: "/logout" },
        ],
      }
    : {
        section: "CUENTA",
        listItems: [
          { icon: "mdi-login", text: "Iniciar Sesión", link: "/login" },
          { icon: "mdi-account-plus", text: "Registrarse", link: "/register" },
        ],
      };

  menu.unshift(accountSection);

  return menu;
}