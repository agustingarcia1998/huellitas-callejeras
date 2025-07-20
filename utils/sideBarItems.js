export function getMenuItems(usuarioActual) {
  const isAdmin = usuarioActual?.rol === "admin";
  const estaLogueado = !!usuarioActual;

  const menu = [
    {
      section: "MENU",
      listItems: [
        { icon: "mdi-view-dashboard", text: "Dashboard", link: "/dashboard" },
        { icon: "mdi-dog", text: "Puppies", link: "/puppies" },
      ],
    },
    {
      section: "NOSOTROS",
      listItems: [
        { icon: "mdi-account-group", text: "Quienes somos", link: "/about" },
        {
          icon: "mdi-file-document",
          text: "Requisitos de Adopción",
          link: "/requirements",
        },
      ],
    },
    {
      section: "ADOPCIÓN",
      listItems: [
        {
          icon: "mdi-clipboard-check",
          text: "Adopción",
          link: "/requisitos",
        },
      ],
    },
    {
      section: "PREGUNTAS FRECUENTES",
      listItems: [{ icon: "mdi-help-circle", text: "FAQ", link: "/faq" }],
    },
  ];

  if (isAdmin) {
    menu.push({
      section: "ADMIN",
      listItems: [
        { icon: "mdi-plus-box", text: "Agregar Mascota", link: "/admin/agregar" },
        { icon: "mdi-delete", text: "Mascotas Adoptadas", link: "/admin/adoptadas" },
      ],
    });
  }

  if (!estaLogueado) {
    menu.push({
      section: "CUENTA",
      listItems: [
        { icon: "mdi-login", text: "Iniciar sesión", link: "/login" },
        { icon: "mdi-account-plus", text: "Registrarse", link: "/register" },
      ],
    });
  } else {
    menu.push({
      section: "CUENTA",
      listItems: [
        { icon: "mdi-logout", text: "Cerrar sesión", link: "/logout" },
      ],
    });
  }

  return menu;
}
