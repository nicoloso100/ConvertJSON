import Axios from "axios";

const headersJson = {
  "Content-Type": "application/json"
};

const messageTypes = {
  success: "success",
  error: "error",
  danger: "danger"
};

export function obtieneVerificacionJson(json, addNotification) {
  function callback() {
    addNotification(
      messageTypes.success,
      "Verificado",
      "La estructura del Json es correcta"
    );
  }
  sendRequest(
    "http://localhost:52671/api/Conversion/ValidateConversion",
    json,
    callback,
    "La estructura del Json NO es correcta",
    addNotification
  );
}

export function obtieneArchivoXML(json, addNotification, setData) {
  function callback(data) {
    addNotification(
      messageTypes.success,
      "Descargando",
      "La descarga se ha iniciado"
    );
    setData(data);
  }
  sendRequest(
    "http://localhost:52671/api/Conversion/GetConversion",
    json,
    callback,
    "Ha ocurrido un error al convertir el archivo",
    addNotification,
    "blob"
  );
}

function sendRequest(
  url,
  body,
  successCallback,
  errorMessage,
  addNotification,
  responseType
) {
  Axios.post(url, body, {
    headers: headersJson,
    responseType: responseType ? responseType : "text/plain"
  })
    .then(res => {
      if (res.status === 200) {
        successCallback(res.data);
      } else {
        addNotification(
          messageTypes.error,
          "warning",
          "No se ha interpretado la respuesta"
        );
      }
    })
    .catch(err => {
      addNotification(messageTypes.danger, "error", errorMessage);
    });
}
