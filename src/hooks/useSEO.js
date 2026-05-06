import { useEffect } from "react";

export function useSEO({ title, description, absolute = false }) {
  useEffect(() => {
    if (title) {
      document.title = absolute ? title : `${title} | Pepal Barry`;
    }

    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      } else {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        metaDescription.content = description;
        document.head.appendChild(metaDescription);
      }
    }
  }, [title, description]);
}
