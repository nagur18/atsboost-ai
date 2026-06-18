from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph
)

def generate_report(
    file_path,
    report
):
    pdf = SimpleDocTemplate(
        file_path
    )

    content = [
        Paragraph(
            f"ATS Score: {report['total_score']}"
        )
    ]

    pdf.build(content)

    return file_path