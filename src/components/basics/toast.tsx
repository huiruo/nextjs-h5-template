import * as React from "react";
import { useSnackbar } from "@mui/base/useSnackbar";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { css, keyframes, styled } from "@mui/system";
import { useEffect, useState } from "react";

interface Direction {
  /**
   * direction: ltr;
   * direction: rtl;
   */
  direction?: "ltr" | "rtl";
}

interface IToaster extends Direction {
  content: string
  isOpen: boolean
  onClose: () => void
}

export default function Toaster({ content, isOpen, direction = 'ltr', onClose }: IToaster) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    onClose()
  };

  const { getRootProps, onClickAway } = useSnackbar({
    onClose: handleClose,
    open,
    autoHideDuration: 2000
  });

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  return (
    <React.Fragment>
      {open ? (
        <ClickAwayListener onClickAway={onClickAway}>
          <CustomSnackbar direction={direction} {...getRootProps()}>{content}</CustomSnackbar>
        </ClickAwayListener>
      ) : null}
    </React.Fragment>
  );
}

const toastFadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const CustomSnackbar = styled("div")<Direction>(
  ({ theme, direction }) => css`
    position: fixed;
    z-index: 5500;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 320px;
    border-radius: 8px;
    border: 1px solid #795548;
    box-shadow: ${theme.palette.mode === "dark"
      ? `0 4px 8px rgb(0 0 0 / 0.7)`
      : `0 4px 8px rgb(0 0 0 / 0.1)`};
    padding: 0.75rem;
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    animation: ${toastFadeIn} 300ms ease-out;
    background-color: #000000;
    direction: ${direction};
    font-size: 14px;
    color: #FFCF0F;
  `
);
