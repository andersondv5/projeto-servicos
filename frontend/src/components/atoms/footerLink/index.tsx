type FooterLinkProps = {
  text: string;
}

function FooterLink({ text }: FooterLinkProps) {
  return (
    <a href="#" className="hover:text-(--link-hover-color) transition">{text}</a>
  );
}

export default FooterLink;


