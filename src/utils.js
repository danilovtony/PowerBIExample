import * as powerbi from "powerbi-client";
import * as pbimodels from "powerbi-models";

import {getData} from "./api/Auth";

export default class PowerBiEmbeddingService {

    static reset(embedContainer) {
        window.powerbi.reset(embedContainer);
    }

    static embedDashboard(dashboard, embedContainer) {

        // data required for embedding Power BI dashboard
        const embedDashboardId = dashboard.id;
        const embedUrl = dashboard.embedUrl;
        const accessToken = getData().accessToken;
        const models = pbimodels;

        const config = {
            type: 'dashboard',
            id: embedDashboardId,
            embedUrl: embedUrl,
            accessToken: accessToken,
            tokenType: models.TokenType.Aad,
            pageView: "fitToWidth" // choices are "actualSize", "fitToWidth" or "oneColumn"
        };

        window.powerbi.reset(embedContainer);
        window.powerbi.embed(embedContainer, config);

    }

    static embedReport(report, embedContainer) {

        const embedReportId = report.id;
        const embedUrl = report.embedUrl;
        const accessToken = getData().accessToken;
        const models = pbimodels;

        const config = {
            type: 'report',
            id: embedReportId,
            embedUrl: embedUrl,
            accessToken: accessToken,
            tokenType: models.TokenType.Aad,
            permissions: models.Permissions.All,
            viewMode: models.ViewMode.View,
            settings: {
                filterPaneEnabled: false,
                navContentPaneEnabled: true,
            }
        };

        window.powerbi.reset(embedContainer);
        return window.powerbi.embed(embedContainer, config);

    }
}