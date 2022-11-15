// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
  { name: "Reports", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

export default function handler(req, res) {
  switch (req.query.q) {
    case 'user':
      res.status(200).json(user);
      break;
    case 'navigation':
      res.status(200).json(navigation);
      break;
    case 'userNavigation':
      res.status(200).json(userNavigation);
      break;

    default:
      res.status(404).json({ message: req.query });
      break;
  }
}
