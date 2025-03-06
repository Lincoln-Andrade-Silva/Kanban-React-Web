import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Route";

class ErrorHandler {
    public static async handleError(error: AxiosError<any>): Promise<void> {
        const { data, status } = error.response || {};

        switch (status) {
            case 400:
                this.handleBadRequestError(data);
                break;
            case 401:
                this.handleUnauthorizedError();
                break;
            case 403:
                this.handleForbiddenError();
                break;
            case 404:
                this.handleNotFoundError();
                break;
            case 500:
                this.handleServerError();
                break;
            default:
                this.handleUnexpectedError();
                break;
        }
    }

    private static handleBadRequestError(data: any): void {
        const message = data?.message || "Requisição inválida. Verifique os dados enviados.";
        toast.error(message);
    }

    private static handleUnauthorizedError(): void {
        toast.error("Acesso não autorizado. Entre em contato com o administrador.");
        router.navigate('/');
    }

    private static handleForbiddenError(): void {
        toast.error("Você não tem permissão para acessar este recurso.");
        router.navigate('/');
    }

    private static handleNotFoundError(): void {
        toast.error("Recurso não encontrado.");
        router.navigate('/');
    }

    private static handleServerError(): void {
        toast.error("Erro no servidor. Entre em contato com o administrador.");
    }

    private static handleUnexpectedError(): void {
        toast.error("Ocorreu um erro inesperado. Entre em contato com o administrador.");
    }
}

export default ErrorHandler;