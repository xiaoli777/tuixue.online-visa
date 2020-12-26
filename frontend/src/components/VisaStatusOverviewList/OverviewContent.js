import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Row, Col, Button, Tooltip, Space, Collapse, Tag } from "antd";
import { MailOutlined, QqOutlined, EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useScreenXS } from "../../hooks";
import { makeNewestVisaStatusSelector } from "../../redux/selectors";
import { overviewAttrProps, newestOverviewProps, overviewProps } from "./overviewPropTypes";
import "./VisaStatusOverview.less";

const { Panel } = Collapse;

const ContentActions = ({ children, onEmailSubsClick, onQQSubsClick, onAddtionClick }) => {
    const { t } = useTranslation();
    return (
        <Space direction="horizontal">
            <Tooltip title={t("overviewEmailIcon")}>
                <Button icon={<MailOutlined />} shape="circle" onClick={() => onEmailSubsClick()} />
            </Tooltip>
            <Tooltip title={t("overviewQQIcon")}>
                <Button icon={<QqOutlined />} shape="circle" onClick={() => onQQSubsClick()} />
            </Tooltip>
            <Tooltip title={t("overviewAddtionalIcon")}>
                <Button icon={<EllipsisOutlined rotate={90} />} shape="circle" onClick={() => onAddtionClick()} />
            </Tooltip>
            {children}
        </Space>
    );
};
ContentActions.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    onEmailSubsClick: PropTypes.func.isRequired,
    onQQSubsClick: PropTypes.func.isRequired,
    onAddtionClick: PropTypes.func.isRequired,
};

export const ContentBar = ({ embassyCode, earliestDate, latestDate, newest }) => {
    const [t] = useTranslation();
    const { writeTime, availableDate } = newest;
    return (
        <Row align="middle" className="ovreview-content-row" gutter={16}>
            <Col md={{ span: 3 }}>{t(embassyCode)}</Col>
            <Col md={{ span: 4 }}>
                <Tooltip title={t("overviewEarliest")}>{earliestDate.join("/")}</Tooltip>
            </Col>
            <Col md={{ span: 4 }}>
                <Tooltip title={t("overviewLatest")}>{latestDate.join("/")}</Tooltip>
            </Col>
            <Col md={{ span: 8 }}>
                <Tooltip title={t("overviewNewest")}>
                    <Row justify="center" align="middle">
                        <Col xs={{ span: 11 }} md={{ span: 9 }}>
                            {availableDate.join("/")}
                        </Col>
                        <Col xs={{ span: 13 }} md={{ span: 9 }}>
                            <Tag>{`${t("at")} ${
                                writeTime.length === 1 ? writeTime[0] : writeTime.slice(3).join(":")
                            }`}</Tag>
                        </Col>
                    </Row>
                </Tooltip>
            </Col>
            <Col md={{ span: 5 }}>
                <ContentActions onEmailSubsClick={() => {}} onQQSubsClick={() => {}} onAddtionClick={() => {}} />
            </Col>
        </Row>
    );
};
ContentBar.propTypes = { ...overviewAttrProps, ...newestOverviewProps };

const ContentCard = ({ embassyCode, earliestDate, latestDate, newest }) => {
    const { t } = useTranslation();
    const [cardDrop, setCardDrop] = useState(false);
    const { writeTime, availableDate } = newest;

    const DropdownControlBtn = () => (
        <Tooltip title="Open Detail">
            <Button
                icon={<PlusOutlined rotate={cardDrop ? 45 : 0} />}
                shape="circle"
                onClick={() => setCardDrop(!cardDrop)}
            />
        </Tooltip>
    );

    const BriefOverview = () => (
        <Row align="middle">
            <Col span={8}>{t(embassyCode)}</Col>
            <Col span={cardDrop ? 0 : 8}>{availableDate.join("/")}</Col>
            <Col span={cardDrop ? 16 : 8}>
                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                    {cardDrop ? (
                        <ContentActions onEmailSubsClick={() => {}} onQQSubsClick={() => {}} onAddtionClick={() => {}}>
                            <DropdownControlBtn />
                        </ContentActions>
                    ) : (
                        <DropdownControlBtn />
                    )}
                </div>
            </Col>
        </Row>
    );

    return (
        <Collapse activeKey={cardDrop ? [embassyCode] : []} className="overview-dropdown-card" ghost>
            <Panel key={embassyCode} header={<BriefOverview />} showArrow={false} forceRender>
                <Row>
                    <Col span={9}>
                        <strong>{t("overviewEarliestDate")}: </strong>
                    </Col>
                    <Col span={15}>{earliestDate.join("/")}</Col>
                    <Col span={9}>
                        <strong>{t("overviewLatestDate")}: </strong>
                    </Col>
                    <Col span={15}>{latestDate.join("/")}</Col>
                    <Col span={9}>
                        <strong>{t("overviewNewestFetch")}: </strong>
                    </Col>
                    <Col span={15}>
                        <Row justify="center" align="middle">
                            <Col xs={{ span: 11 }} md={{ span: 9 }}>
                                {availableDate.join("/")}
                            </Col>
                            <Col xs={{ span: 13 }} md={{ span: 9 }}>
                                <Tag>{`${t("at")} ${
                                    writeTime.length === 1 ? writeTime[0] : writeTime.slice(3).join(":")
                                }`}</Tag>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Panel>
        </Collapse>
    );
};
ContentCard.propTypes = { ...overviewAttrProps, ...newestOverviewProps };

export const HeaderBar = () => {
    const [t] = useTranslation();
    return (
        <Row align="middle" className="ovreview-header bar" gutter={16}>
            <Col xs={{ span: 0 }} md={{ span: 3 }}>
                <strong>{t("Location")}</strong>
            </Col>
            <Col xs={{ span: 0 }} md={{ span: 4 }}>
                <strong>{t("overviewEarliestDate")}</strong>
            </Col>
            <Col xs={{ span: 0 }} md={{ span: 4 }}>
                <strong>{t("overviewLatestDate")}</strong>
            </Col>
            <Col xs={{ span: 0 }} md={{ span: 8 }}>
                <strong>{t("overviewNewestFetch")}</strong>
            </Col>
            <Col xs={{ span: 0 }} md={{ span: 5 }}>
                <strong>{t("overviewActions")}</strong>
            </Col>
        </Row>
    );
};

const HeaderCard = () => {
    const [t] = useTranslation();
    return (
        <Row align="middle" className="ovreview-header card">
            <Col span={8}>
                <strong>{t("Location")}</strong>
            </Col>
            <Col span={8}>
                <strong>{t("overviewNewestFetch")}</strong>
            </Col>
            <Col span={8}>
                <strong>{t("overviewActions")}</strong>
            </Col>
        </Row>
    );
};

export const OverviewHeader = () => {
    const screenXS = useScreenXS();
    return screenXS ? <HeaderCard /> : <HeaderBar />;
};

export const OverviewContent = ({ overview }) => {
    const screenXS = useScreenXS();
    const newestVisaStatueSelector = useMemo(
        () => makeNewestVisaStatusSelector(overview.visaType, overview.embassyCode),
        [overview],
    );
    const newestVisaStatus = useSelector(state => newestVisaStatueSelector(state));
    const newest = newestVisaStatus || { writeTime: ["/"], availableDate: ["/"] };

    return screenXS ? <ContentCard {...overview} newest={newest} /> : <ContentBar {...overview} newest={newest} />;
};
OverviewContent.propTypes = overviewProps;