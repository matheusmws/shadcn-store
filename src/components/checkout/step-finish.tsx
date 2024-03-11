import { useCheckoutStore } from "@/stores/checkout-store";
import { Button } from "@/components/ui/button";
import { generateMessage } from "@/lib/generate-message";
import { Input } from "../ui/input";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { CheckoutSteps } from "@/types/checkout-steps";
import { Dispatch, SetStateAction } from "react";

const formSchema = z.object({
    number: z.string().min(10, 'Preencha o número corretamente')
});

type Props = {
    setStep: Dispatch<SetStateAction<CheckoutSteps>>;
};


export const StepFinish = ({setStep }: Props) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    });

    const { name } = useCheckoutStore(state => state);

    const message = generateMessage();

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const link = `https://wa.me//${values.number}?text=${encodeURI(message)}`;
        window.open(link, "_blank");
    };

    return (
        <div className="text-center flex flex-col gap-5">
            <p>Perfeito <strong>{name}</strong>!</p>
            <p>Agora envie seu pedido ao nosso WhatsApp para concluir.
                Nossos atendentes irão te informar sobre o andamento do pedido.
            </p>
            <Form {...form}>
                <form
                    action=""
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-3"
                >
                    <div className="w-full">
                        <FormField
                            control={form.control}
                            name="number"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Preencha o WhatsApp</FormLabel>
                                        <FormControl>
                                            <Input 
                                            {...field}
                                            placeholder="Ex.: 551199999999"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                    </div>

                    <div className="flex justify-between mt-4">
                    <Button onClick={() => setStep('address')} variant="link">Voltar</Button>
                    <Button type="submit">Enviar para o WhatsApp
                        </Button>
                    </div>
                </form>

            </Form>
        </div>
    );
};