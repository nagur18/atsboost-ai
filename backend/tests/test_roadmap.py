from ai.agents import (
    generate_learning_roadmap
)

def test_roadmap():

    roadmap = (
        generate_learning_roadmap(
            [
                "Docker"
            ]
        )
    )

    assert roadmap