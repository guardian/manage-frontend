import { CSSObject } from "@emotion/core";
import { Form, Formik, FormikProps } from "formik";
import React, { FC, useEffect } from "react";
import palette from "../../../colours";
import { sans } from "../../../styles/fonts";
import { Button } from "../../buttons";
import * as AvatarAPI from "../idapi/avatar";
import { IdentityLocations } from "../IdentityLocations";
import { ErrorTypes } from "../models";
import { PageSection } from "../PageSection";
import { errorMessageCss } from "../sharedStyles";
import { labelCss, textSmall } from "../sharedStyles";

import {
  getData,
  isErrored,
  isLoading,
  isSuccessful,
  useAsyncSource
} from "../useAsyncSource";

interface AvatarSectionProps {
  userId: string;
}

const imgCss: CSSObject = {
  border: "0",
  borderRadius: "50%",
  height: "60px",
  width: "60px"
};

export const AvatarSection: FC<AvatarSectionProps> = props => {
  const { userId } = props;
  const [avatarSaveState, saveAvatar] = useAsyncSource(AvatarAPI.write);
  const [avatarGetState, getAvatar] = useAsyncSource(AvatarAPI.read);

  interface AvatarPayload {
    file: File | null;
  }

  useEffect(() => {
    getAvatar();
  }, []);

  const avatarDisplay = () => {
    const url = isSuccessful(avatarGetState)
      ? getData(avatarGetState).data.avatarUrl
      : `${IdentityLocations.AVATAR_USER_IMAGES}/${userId}`;
    const loading = isLoading(avatarGetState);
    return <>{loading ? "Loading..." : <img css={imgCss} src={url} />}</>;
  };

  const avatarUploadForm = () => (
    <Formik
      initialValues={{
        file: null
      }}
      onSubmit={(values: AvatarPayload) => saveAvatar(values.file)}
      render={(formikBag: FormikProps<AvatarPayload>) => (
        <Form>
          <label css={labelCss}>
            {avatarDisplay()}
            <input
              type="file"
              name="file"
              accept="image/gif, image/jpeg, image/png"
              onChange={(e: React.ChangeEvent) => {
                const target = e.currentTarget as HTMLInputElement;
                if (target.files) {
                  formikBag.setFieldValue("file", target.files[0]);
                }
              }}
            />
          </label>
          <Button text="Upload image" onClick={() => formikBag.submitForm()} />
        </Form>
      )}
    />
  );

  const avatarUploadSuccessNotice = () => (
    <div
      css={{
        ...textSmall,
        lineHeight: "18px",
        fontFamily: sans,
        borderBottom: `1px solid ${palette.green.light}`,
        borderTop: `1px solid ${palette.green.light}`,
        color: palette.green.medium,
        marginTop: "6px",
        padding: "7px 8px"
      }}
    >
      Thank you for uploading your avatar. It will be checked by Guardian
      moderators shortly.
    </div>
  );

  const getErrorMessage = (error: any) => {
    let message;
    if (error.type && error.type === ErrorTypes.VALIDATION) {
      message = error.error;
    } else {
      message =
        "An error occured trying to upload your avatar. Please try again.";
    }
    return <div css={errorMessageCss}>{message}</div>;
  };

  return (
    <PageSection
      title="Profile image"
      description="This image will appear next to your comments. Only .jpg, .png or .gif files of up to 1MB are accepted"
    >
      {isErrored(avatarSaveState)
        ? getErrorMessage(avatarSaveState.error)
        : null}
      {isSuccessful(avatarSaveState)
        ? avatarUploadSuccessNotice()
        : avatarUploadForm()}
    </PageSection>
  );
};
