<App />
  <Auth />                  // log in/sign in functionality
  <Welcome />

    <Navigation />          // holds links to MyProfile MyOrgs MyProjects MyTasks LogOut

    <PublicProjects />      // default page after 'login' or on click of Logo,
                            // shows all public projects
      <ProjectPreview />    // shows brief description of project, owner, date created
                            // no % completed or due date
                            // contain hyperlinked name to individual <ProjectItem /> page

    <Accordion />           // clicking on Avatar or my profile
      <OrgPreview />        // shows brief summary of org, % completed, date created
      <ProjectPreview />    // ^ each contain a hyperlinked name to individual Item page
      <TaskPreview />       // ^

    <MyProfile />           // default page after 'sign up' or on click of Avatar/Username
                            // contains avatar, bio, date joined(?)
      <ProfileForm />       // if signing up, should render, or on click of 'Edit' button

    <MyOrgs />              // holds list of org previews
      <OrgPreview />        // brief summary of org
                            // also has create new org button which will toggle
                            // view of the <OrgForm /> component
      <OrgForm />           // renderIf(adding) form to add organization

    <MyProjects />          // holds list of project previews
      <ProjectPreview />    // brief summary of projects
                            // has create new project button which will toggle
                            // view of the <ProjectForm /> component
      <ProjectForm />       // renderIf(adding) form to add project to org

    <MyTasks />             // holds list of task previews
      <TaskPreview />      // brief summary of tasks
                            // has create new tasks button which will toggle
                            // view of the <TaskForm /> component
      <TaskForm />          // renderIf(adding) form to add task to project

    <OrgItem />             // Detailed view of one org
                            // contains summary, photo, admin, members, etc
      <OrgForm />           // renderIf(editing / user / admin) form to edit org
      <ProjectForm />       // form to add project to organization (toggle view or nah?)
      <ProjectPreview />    // Renders previews of all projects belonging to the organization

    <ProjectItem />         // Detailed view of one project
                            // contains org belonging to, summary, admin, members, etc
      <ProjectForm />       // renderIf(editing / user / admin) form to edit project
      <TaskForm />          // renderIf(user / admin) form to add tasks to project (toggle view or nah?)
      <TaskPreview />       // renderIf(user / admin) renders previews of all tasks belonging to projectot
      <Gant />              // shows gant chart

    <TaskItem />            // Detailed view of one task
                            // contains summary, admin, members, etc
      <TaskForm />          // renderIf(editing / user / admin) form to edit task