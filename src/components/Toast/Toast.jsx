import React from 'react'
import { useToast } from '@/hooks/use-toast'
import { Button } from '../ui/button';

export function Toast() {

    const { toast } = useToast();

    const showToast = () => {
        toast({
            description: "محصول مورد نظر شما با موفقیت به سبد خرید اضافه شد.",
        });
    };

    return (
        <Button onClick={showToast}>
            
        </Button>
    )
}
