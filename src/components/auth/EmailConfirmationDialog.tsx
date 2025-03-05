
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

interface EmailConfirmationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}

const EmailConfirmationDialog = ({ isOpen, onOpenChange, onClose }: EmailConfirmationDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Confirmation par email requise
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <p className="mb-4">
            Un email de confirmation a été envoyé à votre adresse email. Veuillez vérifier votre boîte de réception et cliquer sur le lien pour activer votre compte.
          </p>
          <p className="mb-4">
            Si vous ne trouvez pas l'email, vérifiez votre dossier spam ou courrier indésirable.
          </p>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-souk-700 hover:bg-souk-800 text-white py-2 px-4 rounded-md"
            >
              Compris
            </button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default EmailConfirmationDialog;
