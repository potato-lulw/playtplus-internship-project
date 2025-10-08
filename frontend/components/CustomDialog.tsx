"use client";
import React, { ReactNode } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CustomDialogProps {
  /** Label text shown on the trigger button */
  triggerLabel?: string;

  /** Optional icon component to render next to the trigger label */
  triggerIcon?: ReactNode;

  /** Dialog title text */
  title?: string;

  /** Dialog description text */
  description?: string;

  /** Any React node to render as custom content inside the dialog */
  children?: ReactNode;

  /** Function executed when submit button is clicked */
  onSubmit?: () => void;

  /** Whether to show cancel button */
  showCancel?: boolean;

  /** Label for the submit button */
  submitLabel?: string;

  /** Extra Tailwind CSS classes applied to the trigger element */
  customCss?: string;

  /** Whether to show loading state on submit button */
  isLoading?: boolean;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  triggerLabel = "",
  triggerIcon,
  title = "Dialog Title",
  description = "Dialog description goes here.",
  children,
  onSubmit = () => {},
  showCancel = true,
  submitLabel = "Submit",
  customCss = "",
  isLoading = false,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`font-medium flex gap-2 items-center md:text-lg text-base hover:cursor-pointer rounded-md ${customCss}`}
        >
          {triggerIcon}
          <div className="m-0 text-sm">{triggerLabel}</div>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {/* Custom Content */}
        {children}

        <DialogFooter>
          <div className="w-full flex items-center gap-2 overflow-auto justify-end">
            {showCancel && (
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            )}

            {/* Submit Button */}
            <DialogClose asChild>
              <div>
                {!isLoading ? (
                  <Button
                    type="submit"
                    onClick={onSubmit}
                    disabled={isLoading}
                  >
                    {submitLabel}
                  </Button>
                ) : (
                  <Button disabled>Submitting...</Button>
                )}
              </div>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
