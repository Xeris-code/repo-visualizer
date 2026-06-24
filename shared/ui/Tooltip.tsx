import type { ReactNode } from "react";
import { useCallback, useState } from "react";
import {
    autoUpdate,
    flip,
    FloatingPortal,
    offset,
    shift,
    useDismiss,
    useFloating,
    useFocus,
    useHover,
    useInteractions,
    useRole,
} from "@floating-ui/react";

type TooltipProps = {
    label: string;
    children: ReactNode;
};

export function Tooltip({ label, children }: TooltipProps) {
    const [open, setOpen] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
        open,
        onOpenChange: setOpen,
        placement: "top",
        strategy: "fixed",
        whileElementsMounted: autoUpdate,
        middleware: [offset(8), flip(), shift({ padding: 8 })],
    });

    const setReference = useCallback(
        (node: HTMLElement | null) => {
            refs.setReference(node);
        },
        [refs]
    );

    const setFloating = useCallback(
        (node: HTMLElement | null) => {
            refs.setFloating(node);
        },
        [refs]
    );

    const hover = useHover(context, {
        move: false,
        delay: {
            open: 300,
            close: 0,
        },
    });
    const focus = useFocus(context);
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: "tooltip" });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        hover,
        focus,
        dismiss,
        role,
    ]);

    return (
        <>
            <span
                ref={setReference}
                {...getReferenceProps()}
            >
                {children}
            </span>

            <FloatingPortal>
            {open && (
                <div
                    ref={setFloating}
                    style={{
                        ...floatingStyles,
                        zIndex: 999999,
                        backgroundColor: "#0B1326",
                        color: "white",
                        border: "1px solid rgba(124,58,237,0.4)",
                        borderRadius: "8px",
                        padding: "6px 12px",
                        fontSize: "12px",
                    }}
                    {...getFloatingProps()}                 
                    
                >
                    {label}
                </div>
            )}
            </FloatingPortal>
        </>
    );
}