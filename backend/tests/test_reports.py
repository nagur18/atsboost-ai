from fastapi.testclient import TestClient

from main import app


client = TestClient(app)


def test_export_report_returns_pdf(monkeypatch, tmp_path):
    called = {}

    def fake_generate_report(path, report):
        called['path'] = path
        called['report'] = report
        tmp_path.joinpath('report_1.pdf').write_bytes(b'pdf-bytes')
        return path

    monkeypatch.setattr('routes.reports.generate_report_pdf', fake_generate_report)

    response = client.get('/reports/export/1')

    assert response.status_code == 200
    assert response.headers['content-type'].startswith('application/pdf')
    assert called['report']['total_score'] == 0
    assert called['report']['formatting_score'] == 0
