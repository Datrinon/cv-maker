# Schematics.
Laying out the components of the app is the first step.

- App
    - Header    
    - PreviewPane
    - ResumeMaker
        - ProgressBar
        - Form
            - Heading
            - InputsContainer
            - NavigationButton
    - ReviewArea

| State responsibilities.
- App maintains the state of the resume information. The resume information is the single source of truth shared in between the forms and the preview pane.
- App maintains the state indicating the section that we're in.
    1. Personal
    2. Education
    3. Experience
    4. Skills
    5. Review and Print
- The state that the app is currently in affects the elements that are shown.