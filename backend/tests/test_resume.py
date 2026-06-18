from ai.agents import analyze_resume

def test_resume_agent():

    text = """
    Tom

    Skills:
    Python
    React
    """

    result = analyze_resume(text)

    assert "Skills" in result
    assert isinstance(
        result["Skills"],
        list
    )