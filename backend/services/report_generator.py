from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML
import os

def generate_pdf(logs, output_path="report.pdf"):
    env = Environment(loader=FileSystemLoader("templates"))
    template = env.get_template("report_template.html")

    html_content = template.render(logs=logs, total=len(logs))
    HTML(string=html_content).write_pdf(output_path)
    return output_path