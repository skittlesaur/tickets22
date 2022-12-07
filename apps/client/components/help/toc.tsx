import Page from "@components/help/page";

const helpPages = [
  {
    title: "About Tickets22",
    page: "",
  },
  {
    title: "Microservices",
    page: "/microservices",
    children: [
      {
        title: "Shop",
        page: "/microservices/shop",
      },
      {
        title: "Shop Consumer",
        page: "/microservices/shop-consumer",
      },
      {
        title: "Reservations",
        page: "/microservices/reservations",
      },
      {
        title: "Analytics",
        page: "/microservices/analytics",
      },
      {
        title: "Payments",
        page: "/microservices/payments",
      },
      {
        title: "Security",
        page: "/microservices/security",
      },
    ],
  },
];

const HelpTOC = () => {
  return (
    <div className="sticky top-0 pr-8 py-8 flex flex-col gap-2">
      {helpPages.map(({ page, title, children }) => (
        <Page page={page} title={title} children={children} />
      ))}
    </div>
  );
};

export default HelpTOC;
