import React, { SyntheticEvent } from "react";
import { conf } from "../../../server/config";
import palette from "../../colours";
import { minWidth } from "../../styles/breakpoints";
import { css } from "../../styles/emotion";
import { footerLinks } from "./footerlinks";

const backToTopArrow = css({
  position: "absolute",
  top: "0.375rem",
  bottom: 0,
  left: 0,
  right: 0,
  margin: "auto",
  border: "0.125rem solid #ffffff",
  borderBottom: 0,
  borderRight: 0,
  height: "11px",
  width: "11px",
  transform: "rotate(45deg)"
});

let domain: string;
if (typeof window !== "undefined" && window.guardian) {
  domain = window.guardian.domain;
} else {
  domain = conf.DOMAIN;
}

const fillEmailSignup = (emailForm: SyntheticEvent<HTMLIFrameElement>) => {
  // Placeholder method to autofill user email when the iframe is hosted on the same hostname
  return;
};

const Footer = () => {
  return (
    <footer>
      <div
        css={{
          backgroundColor: palette.neutral.header,
          color: palette.neutral["1"],
          height: "42px",
          "text-align": "right"
        }}
      >
        <div
          css={{
            maxWidth: "71.25rem",
            margin: "auto",
            lineHeight: "42px",
            paddingRight: "2rem",
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <a
            href={"#top"}
            css={{
              color: palette.neutral["1"],
              display: "flex"
            }}
          >
            back to top
            <span
              css={{
                display: "inline-block",
                backgroundColor: palette.neutral["1"],
                height: "48px",
                minWidth: "48px",
                position: "relative",
                borderRadius: "50%",
                marginLeft: "10px",
                transform: "translateY(-6px)"
              }}
            >
              <i className={backToTopArrow} />
            </span>
          </a>
        </div>
      </div>
      <div>
        <div
          css={{
            backgroundColor: palette.neutral["2"],
            color: palette.neutral["5"]
          }}
        >
          <div
            css={{
              padding: "0 0.625rem",
              maxWidth: "81.25rem",
              margin: "auto",

              [minWidth.tablet]: {
                padding: "0 1.25rem"
              }
            }}
          >
            <div
              css={{
                padding: "0.75rem 0",

                [minWidth.desktop]: {
                  padding: "0 0 0.75rem 0",
                  display: "flex",
                  justifyContent: "space-between"
                }
              }}
            >
              <div
                css={{
                  borderBottom: "0.0625rem solid #434343",
                  paddingBottom: "0.75rem",

                  [minWidth.desktop]: {
                    padding: 0,
                    border: 0,
                    width: "18.75rem",
                    margin: "0.75rem 11.25rem 0.75rem 0"
                  }
                }}
              >
                <iframe
                  title="Guardian Email Sign-up Form"
                  src={`https://profile.${domain}/email/form/footer/today-uk`}
                  scrolling="no"
                  seamless={false}
                  frameBorder="0"
                  data-form-success-desc="We will send you our picks of the most important headlines tomorrow morning."
                  data-node-uid="2"
                  height="86px"
                  onLoad={emailForm => fillEmailSignup(emailForm)}
                />
              </div>

              <div
                css={{
                  fontSize: "0.875rem",
                  lineHeight: "0.875rem",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginTop: "0.75rem",

                  [minWidth.tablet]: {
                    margin: "0"
                  }
                }}
              >
                {footerLinks.map((linkList, i) => (
                  <ul
                    key={i}
                    css={{
                      padding: 0,
                      width: "calc(50% - 1.250rem - 1px)",
                      listStyle: "none",
                      position: "relative",
                      margin: 0,

                      "&:nth-child(even)": {
                        borderLeft: "1px solid #434343",
                        paddingLeft: "0.625rem"
                      },

                      [minWidth.tablet]: {
                        padding: "0.75rem 0 0",
                        margin: "0 0.625rem 2.25rem 0",

                        "&:not(:first-child)": {
                          borderLeft: "1px solid #434343",
                          paddingLeft: "0.625rem",
                          marginLeft: "0.625rem"
                        },

                        width: "20%",
                        flex: "1 0 0"
                      },

                      [minWidth.desktop]: {
                        borderLeft: "1px solid #434343",
                        padding: "0.75rem 0 0 0.625rem",
                        margin: "0 0.625rem 2.25rem"
                      }
                    }}
                  >
                    {linkList.map(({ title, link }) => (
                      <li
                        key={title}
                        css={{
                          listStyle: "none"
                        }}
                      >
                        <a
                          href={link}
                          css={{
                            display: "inline-block",
                            paddingBottom: "0.75rem",
                            textTransform: "lowercase",
                            color: "#dcdcdc"
                          }}
                        >
                          {title}
                        </a>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>

            <div
              css={{
                padding: "1.150rem",
                fontSize: "0.75rem",
                borderTop: "0.0625rem solid #434343",
                paddingTop: "0.375rem"
              }}
            >
              © 2018 Guardian News and Media Limited or its affiliated
              companies. All&nbsp;rights&nbsp;reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
