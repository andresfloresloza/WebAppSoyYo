import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import MessageInputs from "../messageInputs";
import { v4 as uuidv4 } from "uuid";
import { getLinksBySocialMedia, insertNewLink } from "../../firebase/firebase";
import { link2FieldsWhatsapp } from "../../utils/socialMediaFields";

export const FormCustom = ({ style, user }) => {
  const [currentUser, setCurrentUser] = useState(user);

  const [openCustom, setOpenCustom] = useState(false);
  const [customLinkDocId, setCustomLinkDocId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [customUrl, setCustomUrl] = useState("");
  const customUrlRef = useRef(null);
  const [customSitio, setCustomSitio] = useState("");
  const customSitioRef = useRef(null);

  useEffect(() => {
    //initWhatsAppInfo(user.uid);
  }, []);

  async function initWhatsAppInfo(uid) {
    const resLinksWhatsapp = await getLinksBySocialMedia(uid, "whatsapp");
    if (resLinksWhatsapp.length > 0) {
      const linkObject = [...resLinksWhatsapp][0];

      let fieldsData = link2FieldsWhatsapp(linkObject.url);
    }
  }

  function addLink() {
    if (customUrl !== "") {
      const newLink = {
        id: uuidv4(),
        title: "WhatsApp",
        category: "primary",
        socialmedia: "whatsapp",
        url: customUrl,
        uid: currentUser.uid,
      };
      const res = insertNewLink(newLink);
      newLink.docId = res.id;
      return newLink.docId;
    }
  }

  const handleOnSubmitCustom = (e) => {
    e.preventDefault();
    e.stopPropagation();

    addLink();
    handleMessageConfirmation();
  };

  function handleOnChangeCustomUrl() {
    setCustomUrl(customUrlRef.current.value);
  }

  function handleMessageConfirmation() {
    setOpenCustom(true);
    setTimeout(() => {
      setOpenCustom(false);
    }, 3000);
  }

  return (
    <>
      <Form className={style} onSubmit={handleOnSubmitCustom}>
        {openCustom ? (
          <MessageInputs
            open={openCustom}
            type={"success"}
            socialmedia={" "}
          ></MessageInputs>
        ) : (
          ""
        )}
        <h2>Datos para los Enlaces Personales</h2>

        <br />
        <Form.Control
          className="input"
          type="text"
          name="sitio"
          placeholder="Nombre del Sitio"
          value={customSitio}
          ref={customSitioRef}
        />
        <br />
        <Form.Control
          className="input"
          type="text"
          name="url"
          placeholder="URL Sitio Web"
          value={customUrl}
          ref={customUrlRef}
          onChange={handleOnChangeCustomUrl}
        />
        <br />
        <Form.Control
          className="input"
          type="file"
          name="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        <br />
        <input
          className="btn-custom"
          type="submit"
          value="Agregar Nuevo Enlace"
        />
      </Form>
    </>
  );
};
