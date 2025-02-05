const configs = {
    baseUrl: window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? "http://127.0.0.1:8000/api"
        : "https://cursos.scvconsulting.co.mz/api",
    payRoute: "/a/v1/mpesa-payment",
}
configs.mpesaUrl = `${configs.baseUrl}${configs.payRoute}`;