import { CardModal } from "../../../components/CardModal";
import { TextInput } from "../../../components/TextInput";

export function DepartmentEditModal() {
    return (
        <CardModal title="Editar Departamento" action="Editar" triggerStyle="!w-full !bg-transparent !shadow-none hover:!bg-gray-200 hover:dark:!bg-gray-600 bottom-3 !font-normal">
            <div className="flex flex-col w-full max-md:px-12 md:px-24 mb-12 gap-4">
                <TextInput.Root labelFor="name" labelText="Departamento">
                    <TextInput.Input id="name" type="text" placeholder="Digite o Departamento..." />
                </TextInput.Root>
            </div>
        </CardModal>
    );
}