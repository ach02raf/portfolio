import "./ProjectDelails.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faDownload,
  faLink,
  faArrowAltCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Locale } from "../../../../i18n-config";

function ProjectDelails(props: {
  ItemsProject: {
    id: string;
    nameProject: string;
    slug: string;
    infoProject: string;
    visitSites: string;
    codeSource: string;
    downloadAPK: string;
    title: string;
    descProject: string;
    imgProject: string[];
    videoProject: string;
    urlProject: string[];
    urlSITE: string[];
    apk: string;
    usedTools: string;
    tools: string[];
  };
  lang: Locale;
  backToHome: string;
}) {
  const project = props.ItemsProject;

  return (
    <div className="project-details p-xl-5 p-2">
      <div className="project-details-contain d-block m-auto">
        {/* Header */}
        <div className="row mb-3">
          <div className="col-lg-2 col-12">
            <Link
              href={`/${props.lang}#${props.backToHome}`}
              className="project-details-contain-backHome"
            >
              <FontAwesomeIcon
                className="project-details-contain-backHome-icon"
                icon={faArrowAltCircleLeft}
              />
            </Link>
          </div>
          <div className="col-lg-10 col-12 text-lg-end text-center project-details-title position-relative">
            <h4>{project.nameProject}</h4>
          </div>
        </div>

        {/* Main Preview */}
        <div className="row">
          {project.imgProject?.[0] && (
            <div
              className={project.videoProject ? "col-xl-8 col-12" : "col-12"}
            >
              <Image
                src={`/Images/${project.imgProject[0]}.png`}
                alt={project.imgProject[0]}
                title={project.imgProject[0]}
                height={512}
                width={1512}
              />
            </div>
          )}
          {project.videoProject && (
            <div className="col-xl-4 col-12 py-xl-0 py-3">
              <video width="100%" height="300px" controls>
                <source
                  src={`/${project.videoProject}.mp4`}
                  type="video/webm"
                />
              </video>
            </div>
          )}
        </div>

        {/* Info + Tools */}
        <div className="row">
          <div className="col-xl-7">
            <h5 className="py-3 position-relative">{project.infoProject}</h5>
            <h6>{project.title}</h6>
            <p className="py-2">{project.descProject}</p>
          </div>
          <div className="col-xl-5">
            <h5 className="py-3 position-relative">{project.usedTools}</h5>
            <div className="row">
              {project.tools?.map((tool, index) => (
                <div className="col-xl-3 col-4" key={index}>
                  <Image
                    src={`/Images/Icons/${tool}.png`}
                    alt={tool}
                    title={tool}
                    height={100}
                    width={100}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Links Section */}
        {(project.imgProject.length > 1 || project.urlSITE.length > 1) && (
          <h5 className="position-relative py-3">{project.visitSites}</h5>
        )}
        <div className="row justify-content-center">
          {project.urlSITE?.length === 1 && (
            <div className="col-md-6">
              <Link
                href={project.urlSITE[0]}
                rel="preload"
                className="project-details-url"
                target="_blank"
              >
                <p className="text-center">
                  <FontAwesomeIcon
                    className="project-details-link"
                    icon={faLink}
                  />
                  {project.visitSites}
                </p>
              </Link>
            </div>
          )}

          {project.apk && (
            <div className="col-md-6">
              <Link
                className="project-details-url"
                href={`/${project.apk}.apk`}
                download={`${project.nameProject}.apk`}
                rel="preload"
                target="_blank"
              >
                <p className="text-center">
                  <FontAwesomeIcon
                    className="project-details-link"
                    icon={faDownload}
                  />
                  {project.downloadAPK}
                </p>
              </Link>
            </div>
          )}

          {project.urlProject?.[0] && (
            <div className="col-md-6">
              <Link
                className="project-details-url"
                href={project.urlProject[0]}
                rel="preload"
                target="_blank"
              >
                <p className="text-center">
                  <FontAwesomeIcon
                    className="project-details-link"
                    icon={faCode}
                  />
                  {project.codeSource}
                </p>
              </Link>
            </div>
          )}
        </div>

        {/* Other Images */}
        <div className="row">
          {project.imgProject.length > 1 &&
            project.imgProject.slice(1).map((item, index) => (
              <div key={index} className="col-lg-4 p-2">
                {project.urlSITE.length > 1 ? (
                  <Link
                    className="project-details-other-link"
                    href={project.urlSITE[index] || project.urlSITE[0]}
                    rel="preload"
                    target="_blank"
                  >
                    <Image
                      src={`/Images/${item}.png`}
                      alt={item}
                      title={item}
                      height={512}
                      width={1512}
                    />
                  </Link>
                ) : (
                  <Image
                    src={`/Images/${item}.png`}
                    alt={item}
                    title={item}
                    height={512}
                    width={1512}
                  />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectDelails;
