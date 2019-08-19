import { Form, Formik, FormikProps } from "formik";
import React, { useState } from "react";
import palette from "../../../colours";
import { sans } from "../../../styles/fonts";
import { Button } from "../../buttons";
import * as AvatarAPI from "../idapi/avatar";
import { PageSection } from "../PageSection";

export const AvatarSection = () => {
  const [avatarSet, setAvatarSet] = useState(false);
  interface AvatarPayload {
    file: File | null;
  }
  const labelCss = {
    display: "block",
    width: "100%",
    "& input, & textarea": {
      display: "block"
    }
  };
  const saveAvatar = async (values: AvatarPayload) => {
    if (values.file) {
      await AvatarAPI.write(values.file);
      setAvatarSet(true);
    }
  };

  const avatarUploadForm = () => (
    <Formik
      initialValues={{
        file: null
      }}
      onSubmit={saveAvatar}
      render={(formikBag: FormikProps<AvatarPayload>) => (
        <Form>
          <label css={labelCss}>
            <p>img here!</p>
            <input
              type="file"
              name="file"
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
        fontSize: "13px",
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
  return (
    <PageSection
      title="Profile image"
      description="This image will appear next to your comments. Only .jpg, .png or .gif files of up to 1MB are accepted"
    >
      {avatarSet ? avatarUploadSuccessNotice() : avatarUploadForm()}
    </PageSection>
  );
};
