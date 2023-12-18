### 15.0.6 Resolve adaptive simulator Angular Material migration.
* 095d3bf -- [CI/CD] Update packages.json version based on GitLab tag.
* fded626 -- Merge branch 'develop' into 'master'
* a5abd84 -- Merge branch 'master' into 'develop'
* 559e3c9 -- Update angular material stylling in ATD simulator
* 3950985 -- Merge branch 'master' into develop
### 15.0.5 Fix faulty buttons in agendas.
* b8a65c7 -- [CI/CD] Update packages.json version based on GitLab tag.
* 2fd89c7 -- Merge branch 'fix-buttons' into 'master'
* 94b1d4e -- Fix faulty buttons
### 15.0.4 Bump version of api to fix allocation id attributes.
* fde9aef -- [CI/CD] Update packages.json version based on GitLab tag.
* 93664ec -- Merge branch 'develop' into 'master'
*   e797819 -- Merge branch 'bump-api-version' into 'develop'
|\  
| * 471b9bd -- Update version of api
|/  
* 3784df0 -- Merge branch '227-add-sorting-options-to-training-run-table' into 'develop'
* d32f546 -- Fix test
* a1fb4f4 -- Bump version
* 0829611 -- Revert package
* 0f2ea9b -- Update versions
* 692cb08 -- Merge branch 'develop' into 227-add-sorting-options-to-training-run-table
* de1a2cf -- Remove sorting options for accessed training runs
* 8c0b784 -- Merge develop
* 2e39371 -- refactor
* 2780fef -- Added sorting support for accessed training run table
* e121568 -- Added sorting of player in training instance summary table
### 15.0.2 Add allocation id to training run table.
* bd55e12 -- [CI/CD] Update packages.json version based on GitLab tag.
* d3a5899 -- Merge branch 'develop' into 'master'
* a110cb4 -- Merge branch '230-change-training-run-table-sandbox-uuid-to-allocation-id' into 'develop'
* 3fbdd09 -- update package.json
* b778547 -- Update version
* 4498dd4 -- Update package.json
* b0d90cb -- Merge branch 'develop' into 230-change-training-run-table-sandbox-uuid-to-allocation-id
* db422c7 -- Add sandbox id to training run table
### 15.0.1 Prune all broken reference and trainee graphs.
* 557c226 -- [CI/CD] Update packages.json version based on GitLab tag.
* 55a997e -- Merge branch 'develop' into 'master'
* 05d92bb -- Merge branch '233-substract-broken-reference-graph-views' into 'develop'
* 5aa57e2 -- Prune all broken reference and trainee graphs
### 15.0.0 Update to Angular 15.
* 9d66e66 -- [CI/CD] Update packages.json version based on GitLab tag.
* d834a38 -- Merge branch '232-update-to-angular-15' into 'master'
* a55a926 -- Update to Angular 15
### 14.6.2 Add created at column to training definition.
* 70d45dc -- [CI/CD] Update packages.json version based on GitLab tag.
* 9743b60 -- Merge branch 'develop' into 'master'
*   e509fad -- Merge branch '231-add-createdat-column-to-training-definition-table' into 'develop'
|\  
| * b5e73eb -- extend logic to adaptive training definition
| * 53359b9 -- Bump model and api package
| * 315e5d8 -- Add created at column to training definition
|/  
* 5a034b2 -- Merge branch '229-fix-disabling-of-pool-button-while-creating-training-instance' into 'develop'
* f783244 -- Rename method isCreated to isCreatedAndStarted
* dc33729 -- Simplify input of training instance to training instance id
* f9d43d2 -- Bump version
* b2383b1 -- Fix disabling of pool button
### 14.6.0 Fix ATD disabled saving when adding questions.
* 28eecdc -- [CI/CD] Update packages.json version based on GitLab tag.
* e915222 -- Merge branch 'develop' into 'master'
* add94f1 -- Merge branch 'master' into 'develop'
*   ba4a04f -- Merge branch '226-unable-to-save-atd-when-adding-multiple-new-questions' into 'develop'
|\  
| * 26f3772 -- Fix ATD saving when adding questions.
|/  
*   7047f8a -- Merge branch '223-fix-markdown-rendering-for-atd-and-ltd-training-run' into 'develop'
|\  
| *   c587ca1 -- Merge branch 'develop' into '223-fix-markdown-rendering-for-atd-and-ltd-training-run'
| |\  
| |/  
|/|   
* |   5c12c10 -- Merge branch '225-fix-word-splitting-in-training-preview' into 'develop'
|\ \  
| * \   494d7ae -- Merge branch 'develop' into '225-fix-word-splitting-in-training-preview'
| |\ \  
| * | | bb53269 -- Update version
| * | | b974996 -- Update version.
| * | | fb5c423 -- Fix word splitting in training preview
* | | |   986235b -- Merge branch '222-fix-training-definition-preview-does-not-support-markdown' into 'develop'
|\ \ \ \  
| |_|/ /  
|/| | |   
| * | | 7761eaf -- Update multiple-choice-question-trainee.component.css
| * | |   afb8685 -- Merge branch 'develop' into '222-fix-training-definition-preview-does-not-support-markdown'
| |\ \ \  
| |/ / /  
|/| | |   
* | | |   7485349 -- Merge branch '224-add-text-wrapping-to-definition-preview' into 'develop'
|\ \ \ \  
| * | | | ac4f291 -- Add text wrapping to definition preview.
| | |/ /  
| |/| |   
* | | |   13f895f -- Merge branch '221-fix-atd-questionnaires-questions-error-after-every-refresh' into 'develop'
|\ \ \ \  
| |/ / /  
|/| | |   
| * | |   78283f6 -- Merge branch 'develop' into '221-fix-atd-questionnaires-questions-error-after-every-refresh'
| |\ \ \  
| |/ / /  
|/| | |   
* | | |   85fb53c -- Merge branch '220-change-authors-title-do-designers-in-atd-and-ltd' into 'develop'
|\ \ \ \  
| * \ \ \   9417cf1 -- Merge branch 'develop' into '220-change-authors-title-do-designers-in-atd-and-ltd'
| |\ \ \ \  
| |/ / / /  
|/| | | |   
* | | | |   69a3edc -- Merge branch '219-fix-unable-to-save-atd-notes-and-outcomes-of-length-1' into 'develop'
|\ \ \ \ \  
| * | | | | 23d3f6f -- Revert client id
| * | | | |   4bd9901 -- Merge branch 'develop' into '219-fix-unable-to-save-atd-notes-and-outcomes-of-length-1'
| |\ \ \ \ \  
| |/ / / / /  
|/| | | | |   
| * | | | | e58122c -- Fix unable to save LTD notes and outcomes of length 1
|  / / / /  
| * | | | eded065 -- Update version.
| * | | | e2145a2 -- Update Designers Title.
|  / / /  
| * | | 7b78457 -- Update version
| * | | 6121a19 -- Fix error in some questions when refreshing.
|  / /  
| * / 910b82d -- Updated training definition preview questions with markup support.
|  /  
| * 7bc9d1a -- Bump version
| * ea65857 -- Update version
| * b9d11ce -- Added markdown support to ATD preview and updated markdown css style color
| * 57e5652 -- Added markdown rendering support to linear training run
|/  
* c26cb0b -- Merge branch '218-add-relevant-sorting-options-to-tables' into 'develop'
* 4cafbde -- Updated version.
* f0f5c08 -- Added sorting options to adaptive instance summary.
* be6155d -- Added sorting to instance overview and summary tables.
### 14.5.18 Fix Markdown text rendering for definition preview and training run.
* ce08fa2 -- [CI/CD] Update packages.json version based on GitLab tag.
*   1585d20 -- Merge branch 'develop' into 'master'
|\  
| * 3581a12 -- Develop
|/  
* 8b61b99 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 8e0f6f3 -- [CI/CD] Update packages.json version based on GitLab tag.
*   52b0a45 -- Merge branch 'develop' into 'master'
|\  
| * 001df8d -- Bump topology graph version.
|/  
* 4fd7001 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 87cd5c5 -- [CI/CD] Update packages.json version based on GitLab tag.
* 5ea5b41 -- Merge branch 'develop' into 'master'
* c492406 -- merge develop into master
### 14.4.12 Bump topology graph version.
* 8e0f6f3 -- [CI/CD] Update packages.json version based on GitLab tag.
*   52b0a45 -- Merge branch 'develop' into 'master'
|\  
| * 001df8d -- Bump topology graph version.
|/  
* 4fd7001 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 87cd5c5 -- [CI/CD] Update packages.json version based on GitLab tag.
* 5ea5b41 -- Merge branch 'develop' into 'master'
* c492406 -- merge develop into master
### 14.4.11 Fixed deletion of ATD questions and question saving without correct answers. Bump model and api versions.
* 87cd5c5 -- [CI/CD] Update packages.json version based on GitLab tag.
* 5ea5b41 -- Merge branch 'develop' into 'master'
* c492406 -- merge develop into master
### 14.4.8 Update topology legend and command timeline display
* e852761 -- [CI/CD] Update packages.json version based on GitLab tag.
* 3131ee8 -- Merge branch '207-update-topology-and-timeline-component-display' into 'master'
* f4813da -- Resolve "Update topology and timeline component display"
### 14.4.7 Restructured cheating detection table actions. Updated detection detail date format. Added specified time proximity to time proximity stage detail.
* 850c7b6 -- [CI/CD] Update packages.json version based on GitLab tag.
* 17f7167 -- Merge branch 'develop' into 'master'
* 55e6755 -- Merge Develop into master
### 14.4.6 Added cheating detection export.
* 666e618 -- [CI/CD] Update packages.json version based on GitLab tag.
* f85a4ef -- Merge branch 'develop' into 'master'
* 0695871 -- Merge develop into master
### 14.4.5 Enabled cheating detection routing.
* 749ad28 -- [CI/CD] Update packages.json version based on GitLab tag.
* b5d123d -- Merge branch 'develop' into 'master'
* 69356c8 -- Enable cheating detection routing
### 14.4.4 Reworked file structure for instance-cheating-detection-detail folder and added module provider to cheating detection event detail.
* 89b2839 -- [CI/CD] Update packages.json version based on GitLab tag.
*   e1b3164 -- Merge branch 'develop' into 'master'
|\  
| * 9391f52 -- Fix version.
* | 108945c -- Merge branch 'develop' into 'master'
|\| 
| * a527099 -- Revert changes to version.
| * f84ccd7 -- Reworked file structure for instance-cheating-detection-detail folder.
|/  
* f00f756 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 01e1ba1 -- [CI/CD] Update packages.json version based on GitLab tag.
* 6e4548f -- Merge branch 'develop' into 'master'
* 330714f -- Updated version.
* 575dd6d -- Added missing import and deleted unused file.
### 14.4.3 Remove unused file and added module provider to cheating detection event detail.
* 01e1ba1 -- [CI/CD] Update packages.json version based on GitLab tag.
* 6e4548f -- Merge branch 'develop' into 'master'
* 330714f -- Updated version.
* 575dd6d -- Added missing import and deleted unused file.
### 14.4.2 Enable cheating detection. Update and enhance cheating detection model with new functionality and fixes.
* 28a850c -- [CI/CD] Update packages.json version based on GitLab tag.
* a21f42c -- Merge branch 'cheating-detection' into 'master'
* 9fb0dae -- Removed documented code. Moved upper bounds of proximity threshold to a variable.
* 55bdaa0 -- Removed unfinished test.
* 3705a94 -- Update version and packages.
* 4aad59a -- Removed console logs.
* ce83927 -- Updated version and merged latest changes from master.
* 2bd8688 -- Removed information about detection events from training runs.
* 2777bb9 -- Merge changes from cheating detection fork.
* 57719c2 -- Merge changes from cheating detection fork.
* af268bd -- Added package-json for detection event detail
* 687df63 -- Added experimental column for detection types to cheating detection table.
* 4092dec -- Fixed routing of components in example app. Changed provider of detection events service to useClass.
* 6205460 -- Moved Detection-event-detail files to a separate module. Fixed routing after creating cheating detection.
### 14.4.1 Disable cheating detection for the 22.12 release.
* decfc7d -- [CI/CD] Update packages.json version based on GitLab tag.
*   6fbe07f -- Merge branch '206-disable-cheating-detection' into 'master'
|\  
| * e9d3780 -- Resolve "Disable cheating detection"
|/  
* 0849761 -- Merge branch 'fix-access-token-dash-split' into 'master'
* 8ff48db -- Fix access token split with multiple dashes
### 14.4.0 Replace sandbox id with sandbox uuid in a training run. Bump visualizations.
* 047971c -- [CI/CD] Update packages.json version based on GitLab tag.
*   6b5326e -- Merge branch 'add-missing-tag-message' into 'master'
|\  
| * 1f1b45f -- Tag message
|/  
*   2ebbfc5 -- Merge branch 'fix-sandbox-uuid' into 'master'
|\  
| * 2f11a25 -- Replace sandbox id with uuid
|/  
*   2a8e796 -- Merge branch '205-fix-disabling-of-pool-selection-during-training-instance-creation' into 'master'
|\  
| * 4fdc343 -- Resolve "Fix disabling of pool selection during training instance creation"
* c4f1de9 -- Merge branch 'integrate-latest-changes-in-statistical-dashboard' into 'master'
* 04bdf5c -- Refactor obtaining of an instance for the statistical dashboard. Bump overview viz.
### 14.3.0 Integrate experimental version of cheating detection.
* 2611ebb -- [CI/CD] Update packages.json version based on GitLab tag.
* 14c0ddb -- Revert deleted tag
* 8282bbd -- Fix package.json deploy script
* e55a841 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* be76752 -- [CI/CD] Update packages.json version based on GitLab tag.
* 4831a57 -- Merge branch 'cheating-detection' into 'master'
* ff00da5 -- Cheating detection
### 14.2.8 Fix unlock of sandboxes when deleting training run.
* 72cbec8 -- [CI/CD] Update packages.json version based on GitLab tag.
* 64e9b2b -- Merge branch '204-fix-training-run-delete-changes-regarding-sandbox-uuid' into 'master'
* 329c7a6 -- Resolve "Fix training run delete changes regarding sandbox uuid"
### 14.2.7 Bump hurdling visualization to integrate refactored version of progress visualization.
* fe8a914 -- [CI/CD] Update packages.json version based on GitLab tag.
* 09c9ba7 -- Merge branch '203-adress-changes-in-hurdling-visualization' into 'master'
* 83452a6 -- Resolve "Adress changes in hurdling visualization"
### 14.2.6 Add an automatic and systematic check of whether logging of events and commands works.
* d4dc31f -- [CI/CD] Update packages.json version based on GitLab tag.
* ac1c938 -- Merge branch '202-add-an-automatic-and-systematic-check-of-whether-logging-works' into 'master'
* 3015fa2 -- Resolve "Add an automatic and systematic check of whether logging works"
### 14.2.5 Fix infinite loading of pool size in instance overview table for records with deleted pools.
* 86785de -- [CI/CD] Update packages.json version based on GitLab tag.
* 6224707 -- Merge branch '201-fix-infinite-loading-of-pool-size-for-deleted-pools' into 'master'
* acffd1a -- Resolve "Fix infinite loading of pool size for deleted pools"
### 14.2.4 Add walkthrough visualization to visualizations for post training analysis.
* 1e099dd -- [CI/CD] Update packages.json version based on GitLab tag.
* d297c8e -- Merge branch '199-integrate-walkthrough-visualization' into 'master'
* 1af0ec4 -- Resolve "Integrate walkthrough visualization"
### 14.2.3 Add command timeline for ongoing trainings in training progress for Instructor. Add access token trimming.
* bccad03 -- [CI/CD] Update packages.json version based on GitLab tag.
*   01ac906 -- Merge branch '200-display-command-timeline-for-ongoing-training-run' into 'master'
|\  
| * f706a3c -- Resolve "Display command timeline for ongoing training run"
|/  
*   a38f118 -- Merge branch 'fix-load-consoles-on-training-access' into 'master'
|\  
| * bf81170 -- Remove local storage save of VMs
|/  
* f7d5508 -- Merge branch '198-trim-access-token-on-instance-save' into 'master'
* 047ebc0 -- Resolve "Trim access token on instance save"
### 14.2.2 Add an option to export score of all trainees from a training instance. Change save strategy for a training instance with non-local environment.
* 23ed10b -- [CI/CD] Update packages.json version based on GitLab tag.
*   2a88820 -- Merge branch '197-export-score-of-all-trainees-from-training-instance' into 'master'
|\  
| * 7fa8960 -- Resolve "Export score of all trainees from training instance"
|/  
* bc4a699 -- Merge branch '195-rework-save-strategy-for-instance-with-non-local-environment' into 'master'
* aaa2f66 -- Resolve "Rework save strategy for instance with non-local environment"
### 14.2.1 Bump adaptive model simulator version.
* 2931082 -- [CI/CD] Update packages.json version based on GitLab tag.
* 15f6f23 -- Merge branch '196-bump-version-of-adaptive-model-simulator' into 'master'
* ae4f5ce -- Resolve "Bump version of adaptive model simulator"
### 14.2.0 Update of refactored assessment visualization. Removed elastic search dependency.
* 9b22b06 -- [CI/CD] Update packages.json version based on GitLab tag.
* 04829dd -- Merge branch '193-bump-assessment-visualization-version' into 'master'
* 624e10c -- Resolve "Bump assessment visualization version"
### 14.1.1 Fix training run results routing.
* 94f5d5a -- [CI/CD] Update packages.json version based on GitLab tag.
* 5147af0 -- Merge branch '194-fix-training-run-results-routing' into 'master'
* 53c3853 -- Resolve "Fix training run results routing"
### 14.1.0 Optimize lazy loaded modules for instance and definition detail. Integrate adaptive model simulating tool.
* fde6ea4 -- [CI/CD] Update packages.json version based on GitLab tag.
*   2a9d566 -- Merge branch '188-integrate-adaptive-model-simulator' into 'master'
|\  
| * 20d2e67 -- "Integrate adaptive model simulator"
|/  
*   ca7c061 -- Merge branch '192-rename-kypo2-to-kypo' into 'master'
|\  
| * 3eaa35e -- Resolve "Rename kypo2 to kypo"
|/  
* b7ff323 -- Merge branch '191-change-lock-color-and-optimize-lazy-loaded-modules' into 'master'
* 90e2694 -- Resolve "Change lock color and optimize lazy loaded modules"
### 14.0.1 Fix markdown errors after Sentinel update.
* ee8121a -- [CI/CD] Update packages.json version based on GitLab tag.
* 02d01ee -- Merge branch '190-fix-markdown-errors-after-sentinel-update' into 'master'
* 7b43795 -- Resolve "Fix markdown errors after Sentinel update"
### 14.0.0 Update to Angular 14.
* e7a2799 -- [CI/CD] Update packages.json version based on GitLab tag.
* 6a6076f -- Merge branch '189-update-to-angular-14' into 'master'
* 0e1011d -- Resolve "Update to Angular 14"
### 13.3.9 Fix instance summary routing for aggregated dashboard.
* 871ca17 -- [CI/CD] Update packages.json version based on GitLab tag.
* 88c7994 -- Merge branch 'fix--aggregated-dashboard-routing' into 'master'
* a073517 -- Fix  aggregated dashboard routing
### 13.3.8 Fix table load event for tables without pagination.
* 29f3045 -- [CI/CD] Update packages.json version based on GitLab tag.
*   ecd3008 -- Merge branch 'allow-table-reload-on-fail' into 'master'
|\  
| * 572b30f -- Fix table reload for training run overview table and training instance summary...
|/  
* cad281a -- Merge branch 'fix-mitre-technique-reload' into 'master'
* 605065f -- Fix mitre reload
### 13.3.7 Fix adaptive instance save when editing pool or sandbox definition selection. Fix adaptive access phase text overflow.
* 65c05d3 -- [CI/CD] Update packages.json version based on GitLab tag.
* 74217cf -- Merge branch '187-fix-adaptive-instance-save-on-edit-and-adaptive-access-phase-text-overflow' into 'master'
* 2b8fe73 -- Resolve "Fix adaptive instance save on edit and adaptive access phase text overflow"
### 13.3.6 Fix margin in adaptive definition create. Bump statistical visualization. Fix filtering in adaptive instance overview table.
* 374b580 -- [CI/CD] Update packages.json version based on GitLab tag.
* db4c90d -- Merge branch '185-adaptive-training-instance-sort-by-start-end-time-not-working' into 'master'
* 1b22d6a -- Resolve "Adaptive training instance sort by start/end time not working"
### 13.3.5 Fix mire techniques expansion panel description position. 
* 3be8c53 -- [CI/CD] Update packages.json version based on GitLab tag.
* cb5110b -- Merge branch '186-fix-mire-techniques-expansion-panel-description-position' into 'master'
* b603e49 -- Resolve "Fix mire techniques expansion panel description position"
### 13.3.4 Allow empty start time in training instance.
* ce4c5da -- [CI/CD] Update packages.json version based on GitLab tag.
* c57861b -- Merge branch '184-allow-empty-start-time-in-training-instance' into 'master'
* f3d40db -- Resolve "Allow empty start time in training instance"
### 13.3.3 Added option to specify in the training level can be completed without commands. Bumped statistical visualization to resolve some issues.
* a080bbd -- [CI/CD] Update packages.json version based on GitLab tag.
*   c20fe16 -- Merge branch '183-bump-statistical-visualization-and-fix-icons-in-results' into 'master'
|\  
| * e9ae4ea -- Resolve "Bump statistical visualization and fix icons in results"
|/  
* ae6dc4c -- Merge branch '181-add-option-to-specifiy-if-the-level-can-be-passed-without-entering-a-commands' into 'master'
* 9113af6 -- Resolve "Add option to specifiy if the level can be passed without entering a commands"
### 13.3.2 Fix correct loading of consoles for topology in training run. Changed polling strategy for progress visualization.
* 5db3690 -- [CI/CD] Update packages.json version based on GitLab tag.
*   b719977 -- Merge branch '182-bump-topology-graph-patch-version' into 'master'
|\  
| * 485c31b -- Resolve "Bump topology graph patch version"
* 6ae94c7 -- Merge branch '178-change-polling-strategy-for-hurdling-visualization' into 'master'
* 3e44fb0 -- Resolve "Change polling strategy for hurdling visualization"
### 13.3.1 Fix total number of actions in TD overview table. Bump version of topology graph and fix next phase for questionnaire.
* 269868d -- [CI/CD] Update packages.json version based on GitLab tag.
*   5117551 -- Merge branch '180-fix-training-definition-table-and-bump-topology' into 'master'
|\  
| * ca0aa88 -- Resolve "Fix training definition table and bump topology"
|/  
* 029c5f0 -- Merge branch 'fix-transition-to-the-next-phase' into 'master'
* 9966701 -- Set correctly value of the observable isCurrentPhaseAnswered when requesting the next phase
### 13.3.0 Add new across instance visualizations. Fix transition to next level/phase on second request fail. Add Map of games.
* 88d3982 -- [CI/CD] Update packages.json version based on GitLab tag.
*   d85a19c -- Merge branch '179-change-project-structure' into 'master'
|\  
| * f0bf4b8 -- Resolve "Change project structure"
|/  
* c8bdd67 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* b5a0fd7 -- [CI/CD] Update packages.json version based on GitLab tag.
* e6af24c -- Added latest version
* ba983dd -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 815b85c -- [CI/CD] Update packages.json version based on GitLab tag.
*   5cdbe58 -- Merge branch '177-integrate-cross-instance-visualizations' into 'master'
|\  
| * 1ab2b4a -- Fix package integrity
| * c06237a -- Tag message
| * 7588f1f -- Add statistical visualization version
| *   69a2a79 -- Merge branch 'master' into 177-integrate-cross-instance-visualizations
| |\  
| * | c63a4f9 -- Integrate statistical visualization
|  /  
* |   afd5647 -- Merge branch '176-fix-transition-to-the-next-level-phase-when-second-request-fails' into 'master'
|\ \  
| |/  
|/|   
| * 1b03ff7 -- Resolve "Fix transition to the next level/phase when second request fails"
|/  
* 1135161 -- Merge branch '158-add-support-for-map-of-games' into 'master'
* 9e15730 -- Resolve "Add support for map of games"
### 13.2.3 Fix training definition selector.
* db3096b -- [CI/CD] Update packages.json version based on GitLab tag.
*   8bd7dad -- Merge branch '175-cannot-select-desired-training-definition-when-editing-training-instance' into 'master'
|\  
| * ebeebcf -- Resolve "Cannot select desired training definition when editing training instance"
* b9a0802 -- Merge branch '174-add-sandbox_definition_id-among-the-variables-in-local-content-of-access-level' into 'master'
* 07dd9ba -- Mention variable SANDBOX_DEFINITION_ID in the info panel of access level
### 13.2.2 Fix training run table pagination.
* 75c795e -- [CI/CD] Update packages.json version based on GitLab tag.
* 4d891f6 -- Merge branch '173-fix-pagination-in-training-run-table' into 'master'
* 4fb22b5 -- Resolve "Fix pagination in training run table"
### 13.2.1 Show additional actions in tables.
* c237fe8 -- [CI/CD] Update packages.json version based on GitLab tag.
* 7470ad1 -- Merge branch '172-show-additional-actions-in-sentinel-tables' into 'master'
* bc74a04 -- Resolve "Show additional actions in sentinel tables"
### 13.2.0 Add support for movement between already accessed levels.
* 09e13b7 -- [CI/CD] Update packages.json version based on GitLab tag.
* b60b2c0 -- Merge branch '160-support-movement-between-accessed-levels-phases-during-training-run' into 'master'
* 3560d9c -- Resolve "Support movement between accessed levels/phases during training run"
### 13.1.4 Add routing for training run visualizations tabs
* 13a116f -- [CI/CD] Update packages.json version based on GitLab tag.
* 7362bd8 -- Merge branch '170-add-routing-for-training-run-visualizations-tabs' into 'master'
* 755d8b2 -- Resolve "Add routing for training run visualizations tabs"
### 13.1.3 Removed upper bound from estimated time and minimal possible solve time. Add info about variant answers above solution content. Trim answer and passkey.
* bf17297 -- [CI/CD] Update packages.json version based on GitLab tag.
*   c51929b -- Merge branch '165-trim-passkey-in-access-level-phase' into 'master'
|\  
| * de0fba3 -- Trim passkey in access level/phase and answer in the training phases.
|/  
*   d5904f3 -- Merge branch '166-add-info-above-solution-content-on-how-to-display-variant-answer-in-text' into 'master'
|\  
| * 673002a -- Description of the ANSWER variable above the solution content.
|/  
* 366f642 -- Merge branch '164-remove-upper-bound-from-estimated-time-and-minimal-possible-solve-time' into 'master'
* 9a0f81a -- Remove upper bound for estimated duration and minimal possible solve time.
### 13.1.2 Bump dashboard version to latest for the upcoming event.
* 5de3f7c -- [CI/CD] Update packages.json version based on GitLab tag.
* bd636da -- Merge branch '168-bump-dashboard' into 'master'
* f856943 -- Bump versions
### 13.1.1 Bump hurdling and overview visualizations to address issues found in the event.
* ecc8a3c -- [CI/CD] Update packages.json version based on GitLab tag.
*   de48c5d -- Merge branch '167-minor-visualizations-fixes' into 'master'
|\  
| * f9a3b8a -- Resolve "Minor visualizations fixes"
|/  
* 44f32c8 -- Merge branch '163-set-minimal-height-of-reference-solution-text-field' into 'master'
* c607cf3 -- Resolve "Set minimal height of reference solution text field"
### 13.1.0 End time of training instance is now editable for ongoing instance. Preview of a reference graph is available in training definitions with reference solution. Fix topology placeholder for preview of training definition. Add variable bearer token in the local content of the access level/phase.
* 134f06d -- [CI/CD] Update packages.json version based on GitLab tag.
*   9544a9e -- Merge branch '162-fix-training-runs-tooltip-and-create-tag' into 'master'
|\  
| * 5ddbfaa -- Resolve "Fix training runs tooltip and create tag"
|/  
*   be368d0 -- Merge branch '161-add-varaible-bearer-token-in-the-local-content-of-the-access-level-phase' into 'master'
|\  
| * cfb37fc -- Resolve "Add varaible bearer token in the local content of the access level/phase"
|/  
*   00067f7 -- Merge branch '13.x.x-pre-tag-changes' into 'master'
|\  
| * 12c0f70 -- 13.x.x pre tag changes
|/  
*   8d2e233 -- Merge branch '156-fix-topology-palceholder-in-td-preview' into 'master'
|\  
| * 761110a -- Resolve "Fix topology palceholder in TD preview"
|/  
* 428560b -- Merge branch '155-make-end-time-of-started-ti-editable' into 'master'
* 5318ec0 -- Resolve "Make end time of started TI editable"
### 13.0.2 Optimize definition preview imports.
* 7bc81fc -- [CI/CD] Update packages.json version based on GitLab tag.
* 6f981db -- Merge branch '154-opitimize-preview-imports' into 'master'
* b493c77 -- Resolve "Opitimize preview imports"
### 13.0.1 Add routing for visualization tabs.
* c0efb1f -- [CI/CD] Update packages.json version based on GitLab tag.
*   72f59bf -- Merge branch '151-add-routing-for-visualization-tabs' into 'master'
|\  
| * 92a45ee -- Resolve "Add routing for visualization tabs"
* |   197797f -- Merge branch '153-pool-size-incorrectly-displays-number-of-free-sandboxes' into 'master'
|\ \  
| |/  
|/|   
| * 24bc255 -- Resolve "Pool size incorrectly displays number of free sandboxes"
|/  
*   020e246 -- Merge branch '152-create-preview-of-adaptive-training-definition' into 'master'
|\  
| * 38cf903 -- Resolve "Create preview of adaptive training definition"
|/  
*   a3c51b9 -- Merge branch '146-add-trainee-email-to-training-run-overview-table' into 'master'
|\  
| * e0742c8 -- Resolve "Add trainee email to training run overview table"
* 60c121a -- Merge branch '12.1.7-pre-tag-changes' into 'master'
* 9164261 -- 12.1.7 pre tag changes
### 13.0.0 Update to Angular 13, CI/CD optimisation, adaptive definition improvements and bug fixes.
* 88697b8 -- [CI/CD] Update packages.json version based on GitLab tag.
*   0bd5c98 -- Merge branch '150-update-to-angular-13' into 'master'
|\  
| * c4adf5c -- Resolve "Update to Angular 13"
|/  
*   b02bab7 -- Merge branch '145-adaptive-definition-improvements' into 'master'
|\  
| * a30f0a2 -- Resolve "Adaptive definition improvements"
|/  
*   1c313d8 -- Merge branch '144-disable-submit-for-assessment-until-required-questions-are-answered' into 'master'
|\  
| * 09d4174 -- Disable submit when required questions are not answered yet
|/  
* 031bad2 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 5f67081 -- [CI/CD] Update packages.json version based on GitLab tag.
*   6a67aec -- Merge branch '143-fix-loading-of-spinner' into 'master'
|\  
| * fba4a43 -- Resolve "Fix loading of spinner"
|/  
* 593d2ac -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 15ef7ff -- [CI/CD] Update packages.json version based on GitLab tag.
*   e9c4f4f -- Merge branch '142-increase-pagination-size-for-pool-selection-in-ti' into 'master'
|\  
| * 371d612 -- Resolve "Increase pagination size for pool selection in TI"
|/  
* 809adaf -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* b58dd5c -- [CI/CD] Update packages.json version based on GitLab tag.
*   3941fff -- Merge branch '141-bump-version' into 'master'
|\  
| * 92a3b86 -- Bump version
|/  
*   cfa1c1e -- Merge branch '140-add-show-progress-to-adaptive-instance-detail' into 'master'
|\  
| * 46298e2 -- Resolve "Add show progress to adaptive instance detail"
|/  
* 02d9b95 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 83c9aa4 -- [CI/CD] Update packages.json version based on GitLab tag.
*   74ad3b3 -- Merge branch '139-fix-adaptive-training-definition-detail' into 'master'
|\  
| * 8bf2d44 -- Resolve "Fix adaptive training definition detail and missing topology legend"
|/  
* 5cc3375 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 577f969 -- [CI/CD] Update packages.json version based on GitLab tag.
*   298298d -- Merge branch '138-add-topology-legend-and-bump-dashboard-version' into 'master'
|\  
| * f52f0d3 -- Add topology legend, update environment
|/  
* 3166dd3 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 8d958c7 -- [CI/CD] Update packages.json version based on GitLab tag.
*   68bb48c -- Merge branch '137-export-all-modules-from-library' into 'master'
|\  
| * 9c290dd -- Add missing exports
|/  
* 8cfe83e -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* a1ced9a -- [CI/CD] Update packages.json version based on GitLab tag.
*   f8de5cb -- Merge branch '134-integrate-dasboard-visualization' into 'master'
|\  
| * 9a07460 -- Resolve "Integrate Dasboard visualization"
|/  
*   ba832ed -- Merge branch '136-integrate-adaptive-transition-visualization' into 'master'
|\  
| * 72726bb -- Resolve "Integrate adaptive transition visualization"
|/  
*   cbd6aaa -- Merge branch '127-integrate-command-visualization' into 'master'
|\  
| * 40784a8 -- Resolve "Integrate command visualization"
|/  
*   5082a65 -- Merge branch '133-fix-training-definition' into 'master'
|\  
| * 439f847 -- Resolve "Fix training definition"
|/  
*   8d3cafa -- Merge branch '135-preload-vm-console-when-training-run-starts' into 'master'
|\  
| * ae589ad -- Resolve "Preload VM console when training run starts"
|/  
*   8bcac1c -- Merge branch '132-add-license-file' into 'master'
|\  
| * 44587cb -- Add license file
|/  
*   903e816 -- Merge branch '131-bump-version-of-sentinel' into 'master'
|\  
| * 52c3902 -- Resolve "Bump version of sentinel"
|/  
*   97e56c5 -- Merge branch '130-change-order-of-icons-in-detail-pages' into 'master'
|\  
| * 7291a1f -- Changed order of icons
|/  
* 9f14afb -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 879562f -- [CI/CD] Update packages.json version based on GitLab tag.
*   ffb87da -- Merge branch '128-add-overview-of-correct-answers-for-each-sandbox-training-run-in-apg-games' into 'master'
|\  
| * ebb6c46 -- Resolve "add overview of correct answers for each sandbox/training run in APG games"
|/  
*   aa6880f -- Merge branch '129-move-checkbox-variant-sandboxes-from-definition-to-training-level' into 'master'
|\  
| * db75fa5 -- Resolve "Move checkbox variant sandboxes from definition to training level"
|/  
*   87fd2ef -- Merge branch '125-update-design-for-training-run' into 'master'
|\  
| * 8b5d376 -- Resolve "Update design for training run"
|/  
* e0e1509 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* e838ee1 -- [CI/CD] Update packages.json version based on GitLab tag.
*   67b6b97 -- Merge branch '126-update-version-of-the-topology-graph-package' into 'master'
|\  
| * 96072e8 -- New version of the topology graph package with configuration for Guacamole.
|/  
* 338e3e9 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 7f786fa -- [CI/CD] Update packages.json version based on GitLab tag.
*   a11f544 -- Merge branch '123-add-option-to-create-default-content-on-create-training-definition-page' into 'master'
|\  
| * e1d2b14 -- Resolve "Add option to create default content on Create Training Definition page"
|/  
*   4189c82 -- Merge branch '113-add-detail-page-for-td' into 'master'
|\  
| * 5e50b44 -- Resolve "Add detail page for TD"
|/  
* 347d9f1 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* a8c8637 -- [CI/CD] Update packages.json version based on GitLab tag.
*   59daf8b -- Merge branch '124-create-tag-with-latest-changes' into 'master'
|\  
| * 9afda99 -- Tag message and overview visualization bump
|/  
*   dca38f6 -- Merge branch '122-fix-assessment-question-stepper' into 'master'
|\  
| * 3c22dab -- Resolve "Fix assessment question stepper"
|/  
* adcd8c6 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 37a41d4 -- [CI/CD] Update packages.json version based on GitLab tag.
### 12.1.6 Fix loading of spinner
* 5f67081 -- [CI/CD] Update packages.json version based on GitLab tag.
*   6a67aec -- Merge branch '143-fix-loading-of-spinner' into 'master'
|\  
| * fba4a43 -- Resolve "Fix loading of spinner"
|/  
* 593d2ac -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 15ef7ff -- [CI/CD] Update packages.json version based on GitLab tag.
*   e9c4f4f -- Merge branch '142-increase-pagination-size-for-pool-selection-in-ti' into 'master'
|\  
| * 371d612 -- Resolve "Increase pagination size for pool selection in TI"
|/  
* 809adaf -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* b58dd5c -- [CI/CD] Update packages.json version based on GitLab tag.
*   3941fff -- Merge branch '141-bump-version' into 'master'
|\  
| * 92a3b86 -- Bump version
|/  
*   cfa1c1e -- Merge branch '140-add-show-progress-to-adaptive-instance-detail' into 'master'
|\  
| * 46298e2 -- Resolve "Add show progress to adaptive instance detail"
|/  
* 02d9b95 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 83c9aa4 -- [CI/CD] Update packages.json version based on GitLab tag.
*   74ad3b3 -- Merge branch '139-fix-adaptive-training-definition-detail' into 'master'
|\  
| * 8bf2d44 -- Resolve "Fix adaptive training definition detail and missing topology legend"
|/  
* 5cc3375 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 577f969 -- [CI/CD] Update packages.json version based on GitLab tag.
*   298298d -- Merge branch '138-add-topology-legend-and-bump-dashboard-version' into 'master'
|\  
| * f52f0d3 -- Add topology legend, update environment
|/  
* 3166dd3 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 8d958c7 -- [CI/CD] Update packages.json version based on GitLab tag.
*   68bb48c -- Merge branch '137-export-all-modules-from-library' into 'master'
|\  
| * 9c290dd -- Add missing exports
|/  
* 8cfe83e -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* a1ced9a -- [CI/CD] Update packages.json version based on GitLab tag.
*   f8de5cb -- Merge branch '134-integrate-dasboard-visualization' into 'master'
|\  
| * 9a07460 -- Resolve "Integrate Dasboard visualization"
|/  
*   ba832ed -- Merge branch '136-integrate-adaptive-transition-visualization' into 'master'
|\  
| * 72726bb -- Resolve "Integrate adaptive transition visualization"
|/  
*   cbd6aaa -- Merge branch '127-integrate-command-visualization' into 'master'
|\  
| * 40784a8 -- Resolve "Integrate command visualization"
|/  
*   5082a65 -- Merge branch '133-fix-training-definition' into 'master'
|\  
| * 439f847 -- Resolve "Fix training definition"
|/  
*   8d3cafa -- Merge branch '135-preload-vm-console-when-training-run-starts' into 'master'
|\  
| * ae589ad -- Resolve "Preload VM console when training run starts"
|/  
*   8bcac1c -- Merge branch '132-add-license-file' into 'master'
|\  
| * 44587cb -- Add license file
|/  
*   903e816 -- Merge branch '131-bump-version-of-sentinel' into 'master'
|\  
| * 52c3902 -- Resolve "Bump version of sentinel"
|/  
*   97e56c5 -- Merge branch '130-change-order-of-icons-in-detail-pages' into 'master'
|\  
| * 7291a1f -- Changed order of icons
|/  
* 9f14afb -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 879562f -- [CI/CD] Update packages.json version based on GitLab tag.
*   ffb87da -- Merge branch '128-add-overview-of-correct-answers-for-each-sandbox-training-run-in-apg-games' into 'master'
|\  
| * ebb6c46 -- Resolve "add overview of correct answers for each sandbox/training run in APG games"
|/  
*   aa6880f -- Merge branch '129-move-checkbox-variant-sandboxes-from-definition-to-training-level' into 'master'
|\  
| * db75fa5 -- Resolve "Move checkbox variant sandboxes from definition to training level"
|/  
*   87fd2ef -- Merge branch '125-update-design-for-training-run' into 'master'
|\  
| * 8b5d376 -- Resolve "Update design for training run"
|/  
* e0e1509 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* e838ee1 -- [CI/CD] Update packages.json version based on GitLab tag.
*   67b6b97 -- Merge branch '126-update-version-of-the-topology-graph-package' into 'master'
|\  
| * 96072e8 -- New version of the topology graph package with configuration for Guacamole.
|/  
* 338e3e9 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 7f786fa -- [CI/CD] Update packages.json version based on GitLab tag.
*   a11f544 -- Merge branch '123-add-option-to-create-default-content-on-create-training-definition-page' into 'master'
|\  
| * e1d2b14 -- Resolve "Add option to create default content on Create Training Definition page"
|/  
*   4189c82 -- Merge branch '113-add-detail-page-for-td' into 'master'
|\  
| * 5e50b44 -- Resolve "Add detail page for TD"
|/  
* 347d9f1 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* a8c8637 -- [CI/CD] Update packages.json version based on GitLab tag.
*   59daf8b -- Merge branch '124-create-tag-with-latest-changes' into 'master'
|\  
| * 9afda99 -- Tag message and overview visualization bump
|/  
*   dca38f6 -- Merge branch '122-fix-assessment-question-stepper' into 'master'
|\  
| * 3c22dab -- Resolve "Fix assessment question stepper"
|/  
* adcd8c6 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 37a41d4 -- [CI/CD] Update packages.json version based on GitLab tag.
*   caa5670 -- Merge branch '121-bump-version' into 'master'
|\  
| * 3f137db -- Bump version
|/  
*   e5eae2d -- Merge branch '120-fix-redirection-after-saving-ati' into 'master'
|\  
| * 0c8886a -- Fix redirect
|/  
* ed627a1 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 8effcae -- [CI/CD] Update packages.json version based on GitLab tag.
* fc82c41 -- Merge branch '119-bump-visualization-versions' into 'master'
### 12.1.5 Fix default pagination for pool selection in training instances.
* 15ef7ff -- [CI/CD] Update packages.json version based on GitLab tag.
*   e9c4f4f -- Merge branch '142-increase-pagination-size-for-pool-selection-in-ti' into 'master'
|\  
| * 371d612 -- Resolve "Increase pagination size for pool selection in TI"
|/  
* 809adaf -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* b58dd5c -- [CI/CD] Update packages.json version based on GitLab tag.
*   3941fff -- Merge branch '141-bump-version' into 'master'
|\  
| * 92a3b86 -- Bump version
|/  
*   cfa1c1e -- Merge branch '140-add-show-progress-to-adaptive-instance-detail' into 'master'
|\  
| * 46298e2 -- Resolve "Add show progress to adaptive instance detail"
|/  
* 02d9b95 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 83c9aa4 -- [CI/CD] Update packages.json version based on GitLab tag.
*   74ad3b3 -- Merge branch '139-fix-adaptive-training-definition-detail' into 'master'
|\  
| * 8bf2d44 -- Resolve "Fix adaptive training definition detail and missing topology legend"
|/  
* 5cc3375 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 577f969 -- [CI/CD] Update packages.json version based on GitLab tag.
*   298298d -- Merge branch '138-add-topology-legend-and-bump-dashboard-version' into 'master'
|\  
| * f52f0d3 -- Add topology legend, update environment
|/  
* 3166dd3 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 8d958c7 -- [CI/CD] Update packages.json version based on GitLab tag.
*   68bb48c -- Merge branch '137-export-all-modules-from-library' into 'master'
|\  
| * 9c290dd -- Add missing exports
|/  
* 8cfe83e -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* a1ced9a -- [CI/CD] Update packages.json version based on GitLab tag.
*   f8de5cb -- Merge branch '134-integrate-dasboard-visualization' into 'master'
|\  
| * 9a07460 -- Resolve "Integrate Dasboard visualization"
|/  
*   ba832ed -- Merge branch '136-integrate-adaptive-transition-visualization' into 'master'
|\  
| * 72726bb -- Resolve "Integrate adaptive transition visualization"
|/  
*   cbd6aaa -- Merge branch '127-integrate-command-visualization' into 'master'
|\  
| * 40784a8 -- Resolve "Integrate command visualization"
|/  
*   5082a65 -- Merge branch '133-fix-training-definition' into 'master'
|\  
| * 439f847 -- Resolve "Fix training definition"
|/  
*   8d3cafa -- Merge branch '135-preload-vm-console-when-training-run-starts' into 'master'
|\  
| * ae589ad -- Resolve "Preload VM console when training run starts"
|/  
*   8bcac1c -- Merge branch '132-add-license-file' into 'master'
|\  
| * 44587cb -- Add license file
|/  
*   903e816 -- Merge branch '131-bump-version-of-sentinel' into 'master'
|\  
| * 52c3902 -- Resolve "Bump version of sentinel"
|/  
*   97e56c5 -- Merge branch '130-change-order-of-icons-in-detail-pages' into 'master'
|\  
| * 7291a1f -- Changed order of icons
|/  
* 9f14afb -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 879562f -- [CI/CD] Update packages.json version based on GitLab tag.
*   ffb87da -- Merge branch '128-add-overview-of-correct-answers-for-each-sandbox-training-run-in-apg-games' into 'master'
|\  
| * ebb6c46 -- Resolve "add overview of correct answers for each sandbox/training run in APG games"
|/  
*   aa6880f -- Merge branch '129-move-checkbox-variant-sandboxes-from-definition-to-training-level' into 'master'
|\  
| * db75fa5 -- Resolve "Move checkbox variant sandboxes from definition to training level"
|/  
*   87fd2ef -- Merge branch '125-update-design-for-training-run' into 'master'
|\  
| * 8b5d376 -- Resolve "Update design for training run"
|/  
* e0e1509 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* e838ee1 -- [CI/CD] Update packages.json version based on GitLab tag.
*   67b6b97 -- Merge branch '126-update-version-of-the-topology-graph-package' into 'master'
|\  
| * 96072e8 -- New version of the topology graph package with configuration for Guacamole.
|/  
* 338e3e9 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 7f786fa -- [CI/CD] Update packages.json version based on GitLab tag.
*   a11f544 -- Merge branch '123-add-option-to-create-default-content-on-create-training-definition-page' into 'master'
|\  
| * e1d2b14 -- Resolve "Add option to create default content on Create Training Definition page"
|/  
*   4189c82 -- Merge branch '113-add-detail-page-for-td' into 'master'
|\  
| * 5e50b44 -- Resolve "Add detail page for TD"
|/  
* 347d9f1 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* a8c8637 -- [CI/CD] Update packages.json version based on GitLab tag.
*   59daf8b -- Merge branch '124-create-tag-with-latest-changes' into 'master'
|\  
| * 9afda99 -- Tag message and overview visualization bump
|/  
*   dca38f6 -- Merge branch '122-fix-assessment-question-stepper' into 'master'
|\  
| * 3c22dab -- Resolve "Fix assessment question stepper"
|/  
* adcd8c6 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 37a41d4 -- [CI/CD] Update packages.json version based on GitLab tag.
*   caa5670 -- Merge branch '121-bump-version' into 'master'
|\  
| * 3f137db -- Bump version
|/  
*   e5eae2d -- Merge branch '120-fix-redirection-after-saving-ati' into 'master'
|\  
| * 0c8886a -- Fix redirect
|/  
* ed627a1 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 8effcae -- [CI/CD] Update packages.json version based on GitLab tag.
*   fc82c41 -- Merge branch '119-bump-visualization-versions' into 'master'
|\  
| * ec9ff9c -- Bump visualizations
|/  
* e326249 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* f3207f5 -- [CI/CD] Update packages.json version based on GitLab tag.
* 066382a -- Merge branch '117-modify-save-strategy-for-training-definition' into 'master'
### 12.1.4 Fix adaptive progress route
* b58dd5c -- [CI/CD] Update packages.json version based on GitLab tag.
*   3941fff -- Merge branch '141-bump-version' into 'master'
|\  
| * 92a3b86 -- Bump version
|/  
*   cfa1c1e -- Merge branch '140-add-show-progress-to-adaptive-instance-detail' into 'master'
|\  
| * 46298e2 -- Resolve "Add show progress to adaptive instance detail"
|/  
* 02d9b95 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 83c9aa4 -- [CI/CD] Update packages.json version based on GitLab tag.
*   74ad3b3 -- Merge branch '139-fix-adaptive-training-definition-detail' into 'master'
|\  
| * 8bf2d44 -- Resolve "Fix adaptive training definition detail and missing topology legend"
|/  
* 5cc3375 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 577f969 -- [CI/CD] Update packages.json version based on GitLab tag.
*   298298d -- Merge branch '138-add-topology-legend-and-bump-dashboard-version' into 'master'
|\  
| * f52f0d3 -- Add topology legend, update environment
|/  
* 3166dd3 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 8d958c7 -- [CI/CD] Update packages.json version based on GitLab tag.
*   68bb48c -- Merge branch '137-export-all-modules-from-library' into 'master'
|\  
| * 9c290dd -- Add missing exports
|/  
* 8cfe83e -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* a1ced9a -- [CI/CD] Update packages.json version based on GitLab tag.
*   f8de5cb -- Merge branch '134-integrate-dasboard-visualization' into 'master'
|\  
| * 9a07460 -- Resolve "Integrate Dasboard visualization"
|/  
*   ba832ed -- Merge branch '136-integrate-adaptive-transition-visualization' into 'master'
|\  
| * 72726bb -- Resolve "Integrate adaptive transition visualization"
|/  
*   cbd6aaa -- Merge branch '127-integrate-command-visualization' into 'master'
|\  
| * 40784a8 -- Resolve "Integrate command visualization"
|/  
*   5082a65 -- Merge branch '133-fix-training-definition' into 'master'
|\  
| * 439f847 -- Resolve "Fix training definition"
|/  
*   8d3cafa -- Merge branch '135-preload-vm-console-when-training-run-starts' into 'master'
|\  
| * ae589ad -- Resolve "Preload VM console when training run starts"
|/  
*   8bcac1c -- Merge branch '132-add-license-file' into 'master'
|\  
| * 44587cb -- Add license file
|/  
*   903e816 -- Merge branch '131-bump-version-of-sentinel' into 'master'
|\  
| * 52c3902 -- Resolve "Bump version of sentinel"
|/  
*   97e56c5 -- Merge branch '130-change-order-of-icons-in-detail-pages' into 'master'
|\  
| * 7291a1f -- Changed order of icons
|/  
* 9f14afb -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 879562f -- [CI/CD] Update packages.json version based on GitLab tag.
*   ffb87da -- Merge branch '128-add-overview-of-correct-answers-for-each-sandbox-training-run-in-apg-games' into 'master'
|\  
| * ebb6c46 -- Resolve "add overview of correct answers for each sandbox/training run in APG games"
|/  
*   aa6880f -- Merge branch '129-move-checkbox-variant-sandboxes-from-definition-to-training-level' into 'master'
|\  
| * db75fa5 -- Resolve "Move checkbox variant sandboxes from definition to training level"
|/  
*   87fd2ef -- Merge branch '125-update-design-for-training-run' into 'master'
|\  
| * 8b5d376 -- Resolve "Update design for training run"
|/  
* e0e1509 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* e838ee1 -- [CI/CD] Update packages.json version based on GitLab tag.
*   67b6b97 -- Merge branch '126-update-version-of-the-topology-graph-package' into 'master'
|\  
| * 96072e8 -- New version of the topology graph package with configuration for Guacamole.
|/  
* 338e3e9 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 7f786fa -- [CI/CD] Update packages.json version based on GitLab tag.
*   a11f544 -- Merge branch '123-add-option-to-create-default-content-on-create-training-definition-page' into 'master'
|\  
| * e1d2b14 -- Resolve "Add option to create default content on Create Training Definition page"
|/  
*   4189c82 -- Merge branch '113-add-detail-page-for-td' into 'master'
|\  
| * 5e50b44 -- Resolve "Add detail page for TD"
|/  
* 347d9f1 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* a8c8637 -- [CI/CD] Update packages.json version based on GitLab tag.
*   59daf8b -- Merge branch '124-create-tag-with-latest-changes' into 'master'
|\  
| * 9afda99 -- Tag message and overview visualization bump
|/  
*   dca38f6 -- Merge branch '122-fix-assessment-question-stepper' into 'master'
|\  
| * 3c22dab -- Resolve "Fix assessment question stepper"
|/  
* adcd8c6 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 37a41d4 -- [CI/CD] Update packages.json version based on GitLab tag.
*   caa5670 -- Merge branch '121-bump-version' into 'master'
|\  
| * 3f137db -- Bump version
|/  
*   e5eae2d -- Merge branch '120-fix-redirection-after-saving-ati' into 'master'
|\  
| * 0c8886a -- Fix redirect
|/  
* ed627a1 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 8effcae -- [CI/CD] Update packages.json version based on GitLab tag.
*   fc82c41 -- Merge branch '119-bump-visualization-versions' into 'master'
|\  
| * ec9ff9c -- Bump visualizations
|/  
* e326249 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* f3207f5 -- [CI/CD] Update packages.json version based on GitLab tag.
*   066382a -- Merge branch '117-modify-save-strategy-for-training-definition' into 'master'
|\  
| * 8db9243 -- Bump training api version and add tag message
| * 2422cd7 -- Fixed tests and saving strategy for adaptive ti
| * b69c7ff -- Adaptive instance save strategy
*   9be061b -- Merge branch '109-make-the-submit-button-more-visible-in-the-adaptive-training' into 'master'
|\  
| * c7c8e10 -- Resolve "Make the submit button more visible in the adaptive training"
|/  
*   3414c95 -- Merge branch '114-display-training-definition-id-when-selecting-training-definition-for-training-instance' into 'master'
|\  
| * a2eae2c -- Fix assessment questions
* a910c12 -- Merge branch '115-display-default-value-of-the-input-fields-in-the-training-phase' into 'master'
### 12.1.3 Fix duration of training runs in instance and run detail, fix adaptive definition detail, bump visualizations.
* 83c9aa4 -- [CI/CD] Update packages.json version based on GitLab tag.
*   74ad3b3 -- Merge branch '139-fix-adaptive-training-definition-detail' into 'master'
|\  
| * 8bf2d44 -- Resolve "Fix adaptive training definition detail and missing topology legend"
|/  
* 5cc3375 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 577f969 -- [CI/CD] Update packages.json version based on GitLab tag.
*   298298d -- Merge branch '138-add-topology-legend-and-bump-dashboard-version' into 'master'
|\  
| * f52f0d3 -- Add topology legend, update environment
|/  
* 3166dd3 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 8d958c7 -- [CI/CD] Update packages.json version based on GitLab tag.
*   68bb48c -- Merge branch '137-export-all-modules-from-library' into 'master'
|\  
| * 9c290dd -- Add missing exports
|/  
* 8cfe83e -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* a1ced9a -- [CI/CD] Update packages.json version based on GitLab tag.
*   f8de5cb -- Merge branch '134-integrate-dasboard-visualization' into 'master'
|\  
| * 9a07460 -- Resolve "Integrate Dasboard visualization"
|/  
*   ba832ed -- Merge branch '136-integrate-adaptive-transition-visualization' into 'master'
|\  
| * 72726bb -- Resolve "Integrate adaptive transition visualization"
|/  
*   cbd6aaa -- Merge branch '127-integrate-command-visualization' into 'master'
|\  
| * 40784a8 -- Resolve "Integrate command visualization"
|/  
*   5082a65 -- Merge branch '133-fix-training-definition' into 'master'
|\  
| * 439f847 -- Resolve "Fix training definition"
|/  
*   8d3cafa -- Merge branch '135-preload-vm-console-when-training-run-starts' into 'master'
|\  
| * ae589ad -- Resolve "Preload VM console when training run starts"
|/  
*   8bcac1c -- Merge branch '132-add-license-file' into 'master'
|\  
| * 44587cb -- Add license file
|/  
*   903e816 -- Merge branch '131-bump-version-of-sentinel' into 'master'
|\  
| * 52c3902 -- Resolve "Bump version of sentinel"
|/  
*   97e56c5 -- Merge branch '130-change-order-of-icons-in-detail-pages' into 'master'
|\  
| * 7291a1f -- Changed order of icons
|/  
* 9f14afb -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 879562f -- [CI/CD] Update packages.json version based on GitLab tag.
*   ffb87da -- Merge branch '128-add-overview-of-correct-answers-for-each-sandbox-training-run-in-apg-games' into 'master'
|\  
| * ebb6c46 -- Resolve "add overview of correct answers for each sandbox/training run in APG games"
|/  
*   aa6880f -- Merge branch '129-move-checkbox-variant-sandboxes-from-definition-to-training-level' into 'master'
|\  
| * db75fa5 -- Resolve "Move checkbox variant sandboxes from definition to training level"
|/  
*   87fd2ef -- Merge branch '125-update-design-for-training-run' into 'master'
|\  
| * 8b5d376 -- Resolve "Update design for training run"
|/  
* e0e1509 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* e838ee1 -- [CI/CD] Update packages.json version based on GitLab tag.
*   67b6b97 -- Merge branch '126-update-version-of-the-topology-graph-package' into 'master'
|\  
| * 96072e8 -- New version of the topology graph package with configuration for Guacamole.
|/  
* 338e3e9 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 7f786fa -- [CI/CD] Update packages.json version based on GitLab tag.
*   a11f544 -- Merge branch '123-add-option-to-create-default-content-on-create-training-definition-page' into 'master'
|\  
| * e1d2b14 -- Resolve "Add option to create default content on Create Training Definition page"
|/  
*   4189c82 -- Merge branch '113-add-detail-page-for-td' into 'master'
|\  
| * 5e50b44 -- Resolve "Add detail page for TD"
|/  
* 347d9f1 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* a8c8637 -- [CI/CD] Update packages.json version based on GitLab tag.
*   59daf8b -- Merge branch '124-create-tag-with-latest-changes' into 'master'
|\  
| * 9afda99 -- Tag message and overview visualization bump
|/  
*   dca38f6 -- Merge branch '122-fix-assessment-question-stepper' into 'master'
|\  
| * 3c22dab -- Resolve "Fix assessment question stepper"
|/  
* adcd8c6 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 37a41d4 -- [CI/CD] Update packages.json version based on GitLab tag.
*   caa5670 -- Merge branch '121-bump-version' into 'master'
|\  
| * 3f137db -- Bump version
|/  
*   e5eae2d -- Merge branch '120-fix-redirection-after-saving-ati' into 'master'
|\  
| * 0c8886a -- Fix redirect
|/  
* ed627a1 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 8effcae -- [CI/CD] Update packages.json version based on GitLab tag.
*   fc82c41 -- Merge branch '119-bump-visualization-versions' into 'master'
|\  
| * ec9ff9c -- Bump visualizations
|/  
* e326249 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* f3207f5 -- [CI/CD] Update packages.json version based on GitLab tag.
*   066382a -- Merge branch '117-modify-save-strategy-for-training-definition' into 'master'
|\  
| * 8db9243 -- Bump training api version and add tag message
| * 2422cd7 -- Fixed tests and saving strategy for adaptive ti
| * b69c7ff -- Adaptive instance save strategy
| * 89a2a8a -- Fix ti save strategy
| *   20775d1 -- Merge changes
| |\  
| | * 5d45198 -- fix saving problems
| | * d115ea6 -- Draft: Adaptive instance change save strategy
| * 272c031 -- Draft: save fix
| * 8280c43 -- Change save strategy for linear training instance
*   9be061b -- Merge branch '109-make-the-submit-button-more-visible-in-the-adaptive-training' into 'master'
|\  
| * c7c8e10 -- Resolve "Make the submit button more visible in the adaptive training"
|/  
*   3414c95 -- Merge branch '114-display-training-definition-id-when-selecting-training-definition-for-training-instance' into 'master'
|\  
| * a2eae2c -- Fix assessment questions
|/  
*   a910c12 -- Merge branch '115-display-default-value-of-the-input-fields-in-the-training-phase' into 'master'
|\  
| * d387e33 -- Added information about default value in wrong answers, allowed command and estimated duration input fields.
* |   19eaf37 -- Merge branch '116-add-node-modules-to-gitignore' into 'master'
|\ \  
| |/  
|/|   
| * a34dc2c -- Resolve "Add node modules to .gitignore"
|/  
* 45dacff -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 2751978 -- [CI/CD] Update packages.json version based on GitLab tag.
* 2077814 -- Merge branch '445537-master-patch-15953' into 'master'
### 12.1.2 Add topology legend, update environment base paths.
* 577f969 -- [CI/CD] Update packages.json version based on GitLab tag.
*   298298d -- Merge branch '138-add-topology-legend-and-bump-dashboard-version' into 'master'
|\  
| * f52f0d3 -- Add topology legend, update environment
|/  
* 3166dd3 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 8d958c7 -- [CI/CD] Update packages.json version based on GitLab tag.
*   68bb48c -- Merge branch '137-export-all-modules-from-library' into 'master'
|\  
| * 9c290dd -- Add missing exports
|/  
* 8cfe83e -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* a1ced9a -- [CI/CD] Update packages.json version based on GitLab tag.
*   f8de5cb -- Merge branch '134-integrate-dasboard-visualization' into 'master'
|\  
| * 9a07460 -- Resolve "Integrate Dasboard visualization"
|/  
*   ba832ed -- Merge branch '136-integrate-adaptive-transition-visualization' into 'master'
|\  
| * 72726bb -- Resolve "Integrate adaptive transition visualization"
|/  
*   cbd6aaa -- Merge branch '127-integrate-command-visualization' into 'master'
|\  
| * 40784a8 -- Resolve "Integrate command visualization"
|/  
*   5082a65 -- Merge branch '133-fix-training-definition' into 'master'
|\  
| * 439f847 -- Resolve "Fix training definition"
|/  
*   8d3cafa -- Merge branch '135-preload-vm-console-when-training-run-starts' into 'master'
|\  
| * ae589ad -- Resolve "Preload VM console when training run starts"
|/  
*   8bcac1c -- Merge branch '132-add-license-file' into 'master'
|\  
| * 44587cb -- Add license file
|/  
*   903e816 -- Merge branch '131-bump-version-of-sentinel' into 'master'
|\  
| * 52c3902 -- Resolve "Bump version of sentinel"
|/  
*   97e56c5 -- Merge branch '130-change-order-of-icons-in-detail-pages' into 'master'
|\  
| * 7291a1f -- Changed order of icons
|/  
* 9f14afb -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 879562f -- [CI/CD] Update packages.json version based on GitLab tag.
*   ffb87da -- Merge branch '128-add-overview-of-correct-answers-for-each-sandbox-training-run-in-apg-games' into 'master'
|\  
| * ebb6c46 -- Resolve "add overview of correct answers for each sandbox/training run in APG games"
|/  
*   aa6880f -- Merge branch '129-move-checkbox-variant-sandboxes-from-definition-to-training-level' into 'master'
|\  
| * db75fa5 -- Resolve "Move checkbox variant sandboxes from definition to training level"
|/  
*   87fd2ef -- Merge branch '125-update-design-for-training-run' into 'master'
|\  
| * 8b5d376 -- Resolve "Update design for training run"
|/  
* e0e1509 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* e838ee1 -- [CI/CD] Update packages.json version based on GitLab tag.
*   67b6b97 -- Merge branch '126-update-version-of-the-topology-graph-package' into 'master'
|\  
| * 96072e8 -- New version of the topology graph package with configuration for Guacamole.
|/  
* 338e3e9 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 7f786fa -- [CI/CD] Update packages.json version based on GitLab tag.
*   a11f544 -- Merge branch '123-add-option-to-create-default-content-on-create-training-definition-page' into 'master'
|\  
| * e1d2b14 -- Resolve "Add option to create default content on Create Training Definition page"
|/  
*   4189c82 -- Merge branch '113-add-detail-page-for-td' into 'master'
|\  
| * 5e50b44 -- Resolve "Add detail page for TD"
|/  
* 347d9f1 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* a8c8637 -- [CI/CD] Update packages.json version based on GitLab tag.
*   59daf8b -- Merge branch '124-create-tag-with-latest-changes' into 'master'
|\  
| * 9afda99 -- Tag message and overview visualization bump
|/  
*   dca38f6 -- Merge branch '122-fix-assessment-question-stepper' into 'master'
|\  
| * 3c22dab -- Resolve "Fix assessment question stepper"
|/  
* adcd8c6 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 37a41d4 -- [CI/CD] Update packages.json version based on GitLab tag.
*   caa5670 -- Merge branch '121-bump-version' into 'master'
|\  
| * 3f137db -- Bump version
|/  
*   e5eae2d -- Merge branch '120-fix-redirection-after-saving-ati' into 'master'
|\  
| * 0c8886a -- Fix redirect
|/  
* ed627a1 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 8effcae -- [CI/CD] Update packages.json version based on GitLab tag.
*   fc82c41 -- Merge branch '119-bump-visualization-versions' into 'master'
|\  
| * ec9ff9c -- Bump visualizations
|/  
* e326249 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* f3207f5 -- [CI/CD] Update packages.json version based on GitLab tag.
*   066382a -- Merge branch '117-modify-save-strategy-for-training-definition' into 'master'
|\  
| * 8db9243 -- Bump training api version and add tag message
| * 2422cd7 -- Fixed tests and saving strategy for adaptive ti
| * b69c7ff -- Adaptive instance save strategy
| * 89a2a8a -- Fix ti save strategy
| *   20775d1 -- Merge changes
| |\  
| | * 5d45198 -- fix saving problems
| | * d115ea6 -- Draft: Adaptive instance change save strategy
| * | 272c031 -- Draft: save fix
| |/  
| * 8280c43 -- Change save strategy for linear training instance
| * 56da3fe -- Fix problems with adaptive td save strategy, fix failing tests for linear and adaptive TD
| * 2777939 -- Prettier changes
| * ccab86c -- Adaptive definition save strategy changed
*   9be061b -- Merge branch '109-make-the-submit-button-more-visible-in-the-adaptive-training' into 'master'
|\  
| * c7c8e10 -- Resolve "Make the submit button more visible in the adaptive training"
|/  
*   3414c95 -- Merge branch '114-display-training-definition-id-when-selecting-training-definition-for-training-instance' into 'master'
|\  
| * a2eae2c -- Fix assessment questions
|/  
*   a910c12 -- Merge branch '115-display-default-value-of-the-input-fields-in-the-training-phase' into 'master'
|\  
| * d387e33 -- Added information about default value in wrong answers, allowed command and estimated duration input fields.
* |   19eaf37 -- Merge branch '116-add-node-modules-to-gitignore' into 'master'
|\ \  
| |/  
|/|   
| * a34dc2c -- Resolve "Add node modules to .gitignore"
|/  
* 45dacff -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 2751978 -- [CI/CD] Update packages.json version based on GitLab tag.
*   2077814 -- Merge branch '445537-master-patch-15953' into 'master'
|\  
| * d1903d2 -- Update VERSION.txt
|/  
*   6c93206 -- Merge branch '98-add-expansion-panel-with-related-questions-to-the-training-phase' into 'master'
|\  
| * 346787c -- Added expansion panel to training phase to display all related questions.
|/  
*   659722e -- Merge branch '93-integrate-functionality-for-automatic-problem-generation-apg' into 'master'
|\  
| * 5ea1298 -- Renaming variantAnswers to variantSandboxes and flagIdentifier to...
* 5939b2d -- Merge branch '112-trigger-form-validity-when-new-element-is-added' into 'master'
### 12.1.1 Export missing modules from library.
* 8d958c7 -- [CI/CD] Update packages.json version based on GitLab tag.
*   68bb48c -- Merge branch '137-export-all-modules-from-library' into 'master'
|\  
| * 9c290dd -- Add missing exports
|/  
* 8cfe83e -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* a1ced9a -- [CI/CD] Update packages.json version based on GitLab tag.
*   f8de5cb -- Merge branch '134-integrate-dasboard-visualization' into 'master'
|\  
| * 9a07460 -- Resolve "Integrate Dasboard visualization"
|/  
*   ba832ed -- Merge branch '136-integrate-adaptive-transition-visualization' into 'master'
|\  
| * 72726bb -- Resolve "Integrate adaptive transition visualization"
|/  
*   cbd6aaa -- Merge branch '127-integrate-command-visualization' into 'master'
|\  
| * 40784a8 -- Resolve "Integrate command visualization"
|/  
*   5082a65 -- Merge branch '133-fix-training-definition' into 'master'
|\  
| * 439f847 -- Resolve "Fix training definition"
|/  
*   8d3cafa -- Merge branch '135-preload-vm-console-when-training-run-starts' into 'master'
|\  
| * ae589ad -- Resolve "Preload VM console when training run starts"
|/  
*   8bcac1c -- Merge branch '132-add-license-file' into 'master'
|\  
| * 44587cb -- Add license file
|/  
*   903e816 -- Merge branch '131-bump-version-of-sentinel' into 'master'
|\  
| * 52c3902 -- Resolve "Bump version of sentinel"
|/  
*   97e56c5 -- Merge branch '130-change-order-of-icons-in-detail-pages' into 'master'
|\  
| * 7291a1f -- Changed order of icons
|/  
* 9f14afb -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 879562f -- [CI/CD] Update packages.json version based on GitLab tag.
*   ffb87da -- Merge branch '128-add-overview-of-correct-answers-for-each-sandbox-training-run-in-apg-games' into 'master'
|\  
| * ebb6c46 -- Resolve "add overview of correct answers for each sandbox/training run in APG games"
|/  
*   aa6880f -- Merge branch '129-move-checkbox-variant-sandboxes-from-definition-to-training-level' into 'master'
|\  
| * db75fa5 -- Resolve "Move checkbox variant sandboxes from definition to training level"
|/  
*   87fd2ef -- Merge branch '125-update-design-for-training-run' into 'master'
|\  
| * 8b5d376 -- Resolve "Update design for training run"
|/  
* e0e1509 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* e838ee1 -- [CI/CD] Update packages.json version based on GitLab tag.
*   67b6b97 -- Merge branch '126-update-version-of-the-topology-graph-package' into 'master'
|\  
| * 96072e8 -- New version of the topology graph package with configuration for Guacamole.
|/  
* 338e3e9 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 7f786fa -- [CI/CD] Update packages.json version based on GitLab tag.
*   a11f544 -- Merge branch '123-add-option-to-create-default-content-on-create-training-definition-page' into 'master'
|\  
| * e1d2b14 -- Resolve "Add option to create default content on Create Training Definition page"
|/  
*   4189c82 -- Merge branch '113-add-detail-page-for-td' into 'master'
|\  
| * 5e50b44 -- Resolve "Add detail page for TD"
|/  
* 347d9f1 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* a8c8637 -- [CI/CD] Update packages.json version based on GitLab tag.
*   59daf8b -- Merge branch '124-create-tag-with-latest-changes' into 'master'
|\  
| * 9afda99 -- Tag message and overview visualization bump
|/  
*   dca38f6 -- Merge branch '122-fix-assessment-question-stepper' into 'master'
|\  
| * 3c22dab -- Resolve "Fix assessment question stepper"
|/  
* adcd8c6 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 37a41d4 -- [CI/CD] Update packages.json version based on GitLab tag.
*   caa5670 -- Merge branch '121-bump-version' into 'master'
|\  
| * 3f137db -- Bump version
|/  
*   e5eae2d -- Merge branch '120-fix-redirection-after-saving-ati' into 'master'
|\  
| * 0c8886a -- Fix redirect
|/  
* ed627a1 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 8effcae -- [CI/CD] Update packages.json version based on GitLab tag.
*   fc82c41 -- Merge branch '119-bump-visualization-versions' into 'master'
|\  
| * ec9ff9c -- Bump visualizations
|/  
* e326249 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* f3207f5 -- [CI/CD] Update packages.json version based on GitLab tag.
*   066382a -- Merge branch '117-modify-save-strategy-for-training-definition' into 'master'
|\  
| * 8db9243 -- Bump training api version and add tag message
| * 2422cd7 -- Fixed tests and saving strategy for adaptive ti
| * b69c7ff -- Adaptive instance save strategy
| * 89a2a8a -- Fix ti save strategy
| *   20775d1 -- Merge changes
| |\  
| | * 5d45198 -- fix saving problems
| | * d115ea6 -- Draft: Adaptive instance change save strategy
| * | 272c031 -- Draft: save fix
| |/  
| * 8280c43 -- Change save strategy for linear training instance
| * 56da3fe -- Fix problems with adaptive td save strategy, fix failing tests for linear and adaptive TD
| * 2777939 -- Prettier changes
| * ccab86c -- Adaptive definition save strategy changed
| * c01118f -- Fix save, change TD edit layout
| * 59ec2d9 -- Display level edit components when the training definition is created.
| * fe40b40 -- Fix save disabled logic when saving training definition and levels.
*   9be061b -- Merge branch '109-make-the-submit-button-more-visible-in-the-adaptive-training' into 'master'
|\  
| * c7c8e10 -- Resolve "Make the submit button more visible in the adaptive training"
|/  
*   3414c95 -- Merge branch '114-display-training-definition-id-when-selecting-training-definition-for-training-instance' into 'master'
|\  
| * a2eae2c -- Fix assessment questions
|/  
*   a910c12 -- Merge branch '115-display-default-value-of-the-input-fields-in-the-training-phase' into 'master'
|\  
| * d387e33 -- Added information about default value in wrong answers, allowed command and estimated duration input fields.
* |   19eaf37 -- Merge branch '116-add-node-modules-to-gitignore' into 'master'
|\ \  
| |/  
|/|   
| * a34dc2c -- Resolve "Add node modules to .gitignore"
|/  
* 45dacff -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 2751978 -- [CI/CD] Update packages.json version based on GitLab tag.
*   2077814 -- Merge branch '445537-master-patch-15953' into 'master'
|\  
| * d1903d2 -- Update VERSION.txt
|/  
*   6c93206 -- Merge branch '98-add-expansion-panel-with-related-questions-to-the-training-phase' into 'master'
|\  
| * 346787c -- Added expansion panel to training phase to display all related questions.
|/  
*   659722e -- Merge branch '93-integrate-functionality-for-automatic-problem-generation-apg' into 'master'
|\  
| * 5ea1298 -- Renaming variantAnswers to variantSandboxes and flagIdentifier to...
|/  
*   5939b2d -- Merge branch '112-trigger-form-validity-when-new-element-is-added' into 'master'
|\  
| * 3754e2f -- Resolve "Trigger form validity when new element is added"
|/  
*   a1e8b78 -- Merge branch '83-allow-movement-between-levels-in-preview-mode' into 'master'
|\  
| * 265181e -- Resolve "Allow movement between levels in preview mode"
|/  
*   afcd7bd -- Merge branch '99-fix-computation-of-the-free-sandboxes-in-the-training-instance-overview' into 'master'
|\  
| * 06d38bd -- Resolve "Fix computation of the free sandboxes in the training instance overview"
* 3f89758 -- Merge branch '111-rename-game-level-to-training-level' into 'master'
### 12.1.0 Add adaptive transition visualization, visualizations for command analysis, dashboard for organizer and Preloading of consoles for VMs.
* a1ced9a -- [CI/CD] Update packages.json version based on GitLab tag.
*   f8de5cb -- Merge branch '134-integrate-dasboard-visualization' into 'master'
|\  
| * 9a07460 -- Resolve "Integrate Dasboard visualization"
|/  
*   ba832ed -- Merge branch '136-integrate-adaptive-transition-visualization' into 'master'
|\  
| * 72726bb -- Resolve "Integrate adaptive transition visualization"
|/  
*   cbd6aaa -- Merge branch '127-integrate-command-visualization' into 'master'
|\  
| * 40784a8 -- Resolve "Integrate command visualization"
|/  
*   5082a65 -- Merge branch '133-fix-training-definition' into 'master'
|\  
| * 439f847 -- Resolve "Fix training definition"
|/  
*   8d3cafa -- Merge branch '135-preload-vm-console-when-training-run-starts' into 'master'
|\  
| * ae589ad -- Resolve "Preload VM console when training run starts"
|/  
*   8bcac1c -- Merge branch '132-add-license-file' into 'master'
|\  
| * 44587cb -- Add license file
|/  
*   903e816 -- Merge branch '131-bump-version-of-sentinel' into 'master'
|\  
| * 52c3902 -- Resolve "Bump version of sentinel"
|/  
*   97e56c5 -- Merge branch '130-change-order-of-icons-in-detail-pages' into 'master'
|\  
| * 7291a1f -- Changed order of icons
|/  
* 9f14afb -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 879562f -- [CI/CD] Update packages.json version based on GitLab tag.
*   ffb87da -- Merge branch '128-add-overview-of-correct-answers-for-each-sandbox-training-run-in-apg-games' into 'master'
|\  
| * ebb6c46 -- Resolve "add overview of correct answers for each sandbox/training run in APG games"
|/  
*   aa6880f -- Merge branch '129-move-checkbox-variant-sandboxes-from-definition-to-training-level' into 'master'
|\  
| * db75fa5 -- Resolve "Move checkbox variant sandboxes from definition to training level"
|/  
*   87fd2ef -- Merge branch '125-update-design-for-training-run' into 'master'
|\  
| * 8b5d376 -- Resolve "Update design for training run"
|/  
* e0e1509 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* e838ee1 -- [CI/CD] Update packages.json version based on GitLab tag.
*   67b6b97 -- Merge branch '126-update-version-of-the-topology-graph-package' into 'master'
|\  
| * 96072e8 -- New version of the topology graph package with configuration for Guacamole.
|/  
* 338e3e9 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 7f786fa -- [CI/CD] Update packages.json version based on GitLab tag.
*   a11f544 -- Merge branch '123-add-option-to-create-default-content-on-create-training-definition-page' into 'master'
|\  
| * e1d2b14 -- Resolve "Add option to create default content on Create Training Definition page"
|/  
*   4189c82 -- Merge branch '113-add-detail-page-for-td' into 'master'
|\  
| * 5e50b44 -- Resolve "Add detail page for TD"
|/  
* 347d9f1 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* a8c8637 -- [CI/CD] Update packages.json version based on GitLab tag.
*   59daf8b -- Merge branch '124-create-tag-with-latest-changes' into 'master'
|\  
| * 9afda99 -- Tag message and overview visualization bump
|/  
*   dca38f6 -- Merge branch '122-fix-assessment-question-stepper' into 'master'
|\  
| * 3c22dab -- Resolve "Fix assessment question stepper"
|/  
* adcd8c6 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 37a41d4 -- [CI/CD] Update packages.json version based on GitLab tag.
*   caa5670 -- Merge branch '121-bump-version' into 'master'
|\  
| * 3f137db -- Bump version
|/  
*   e5eae2d -- Merge branch '120-fix-redirection-after-saving-ati' into 'master'
|\  
| * 0c8886a -- Fix redirect
|/  
* ed627a1 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 8effcae -- [CI/CD] Update packages.json version based on GitLab tag.
*   fc82c41 -- Merge branch '119-bump-visualization-versions' into 'master'
|\  
| * ec9ff9c -- Bump visualizations
|/  
* e326249 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* f3207f5 -- [CI/CD] Update packages.json version based on GitLab tag.
*   066382a -- Merge branch '117-modify-save-strategy-for-training-definition' into 'master'
|\  
| * 8db9243 -- Bump training api version and add tag message
| * 2422cd7 -- Fixed tests and saving strategy for adaptive ti
| * b69c7ff -- Adaptive instance save strategy
| * 89a2a8a -- Fix ti save strategy
| *   20775d1 -- Merge changes
| |\  
| | * 5d45198 -- fix saving problems
| | * d115ea6 -- Draft: Adaptive instance change save strategy
| * | 272c031 -- Draft: save fix
| |/  
| * 8280c43 -- Change save strategy for linear training instance
| * 56da3fe -- Fix problems with adaptive td save strategy, fix failing tests for linear and adaptive TD
| * 2777939 -- Prettier changes
| * ccab86c -- Adaptive definition save strategy changed
| * c01118f -- Fix save, change TD edit layout
| * 59ec2d9 -- Display level edit components when the training definition is created.
| * fe40b40 -- Fix save disabled logic when saving training definition and levels.
| * 82f19b6 -- Draft: change save strategy
* |   9be061b -- Merge branch '109-make-the-submit-button-more-visible-in-the-adaptive-training' into 'master'
|\ \  
| * | c7c8e10 -- Resolve "Make the submit button more visible in the adaptive training"
|/ /  
* |   3414c95 -- Merge branch '114-display-training-definition-id-when-selecting-training-definition-for-training-instance' into 'master'
|\ \  
| * | a2eae2c -- Fix assessment questions
|/ /  
* |   a910c12 -- Merge branch '115-display-default-value-of-the-input-fields-in-the-training-phase' into 'master'
|\ \  
| |/  
|/|   
| * d387e33 -- Added information about default value in wrong answers, allowed command and estimated duration input fields.
* |   19eaf37 -- Merge branch '116-add-node-modules-to-gitignore' into 'master'
|\ \  
| |/  
|/|   
| * a34dc2c -- Resolve "Add node modules to .gitignore"
|/  
* 45dacff -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 2751978 -- [CI/CD] Update packages.json version based on GitLab tag.
*   2077814 -- Merge branch '445537-master-patch-15953' into 'master'
|\  
| * d1903d2 -- Update VERSION.txt
|/  
*   6c93206 -- Merge branch '98-add-expansion-panel-with-related-questions-to-the-training-phase' into 'master'
|\  
| * 346787c -- Added expansion panel to training phase to display all related questions.
|/  
*   659722e -- Merge branch '93-integrate-functionality-for-automatic-problem-generation-apg' into 'master'
|\  
| * 5ea1298 -- Renaming variantAnswers to variantSandboxes and flagIdentifier to...
|/  
*   5939b2d -- Merge branch '112-trigger-form-validity-when-new-element-is-added' into 'master'
|\  
| * 3754e2f -- Resolve "Trigger form validity when new element is added"
|/  
*   a1e8b78 -- Merge branch '83-allow-movement-between-levels-in-preview-mode' into 'master'
|\  
| * 265181e -- Resolve "Allow movement between levels in preview mode"
|/  
*   afcd7bd -- Merge branch '99-fix-computation-of-the-free-sandboxes-in-the-training-instance-overview' into 'master'
|\  
| * 06d38bd -- Resolve "Fix computation of the free sandboxes in the training instance overview"
|/  
*   3f89758 -- Merge branch '111-rename-game-level-to-training-level' into 'master'
|\  
| * 345ecd6 -- Resolve "Rename game level to training level"
|/  
*   69acd54 -- Merge branch '110-rename-the-flag-attribute-to-answer-in-linear-training-definition' into 'master'
|\  
| * cc308c9 -- Resolve "Rename the flag attribute to answer in linear training definition"
|/  
*   9e88679 -- Merge branch '108-improve-the-text-in-the-modal-window-in-the-transition-process-between-adaptive-phases' into 'master'
|\  
| * 19bc340 -- Resolve "Improve the text in the modal window in the transition process between adaptive phases"
* 5dcd554 -- Merge branch '107-add-confirmation-for-deleting-instances' into 'master'
### 12.0.14 New training run design. Move checkbox for variant sandboxes to training levels. Add overview of correct answers for each sandbox.
* 879562f -- [CI/CD] Update packages.json version based on GitLab tag.
*   ffb87da -- Merge branch '128-add-overview-of-correct-answers-for-each-sandbox-training-run-in-apg-games' into 'master'
|\  
| * ebb6c46 -- Resolve "add overview of correct answers for each sandbox/training run in APG games"
|/  
*   aa6880f -- Merge branch '129-move-checkbox-variant-sandboxes-from-definition-to-training-level' into 'master'
|\  
| * db75fa5 -- Resolve "Move checkbox variant sandboxes from definition to training level"
|/  
*   87fd2ef -- Merge branch '125-update-design-for-training-run' into 'master'
|\  
| * 8b5d376 -- Resolve "Update design for training run"
|/  
* e0e1509 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* e838ee1 -- [CI/CD] Update packages.json version based on GitLab tag.
*   67b6b97 -- Merge branch '126-update-version-of-the-topology-graph-package' into 'master'
|\  
| * 96072e8 -- New version of the topology graph package with configuration for Guacamole.
|/  
* 338e3e9 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 7f786fa -- [CI/CD] Update packages.json version based on GitLab tag.
*   a11f544 -- Merge branch '123-add-option-to-create-default-content-on-create-training-definition-page' into 'master'
|\  
| * e1d2b14 -- Resolve "Add option to create default content on Create Training Definition page"
|/  
*   4189c82 -- Merge branch '113-add-detail-page-for-td' into 'master'
|\  
| * 5e50b44 -- Resolve "Add detail page for TD"
|/  
* 347d9f1 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* a8c8637 -- [CI/CD] Update packages.json version based on GitLab tag.
*   59daf8b -- Merge branch '124-create-tag-with-latest-changes' into 'master'
|\  
| * 9afda99 -- Tag message and overview visualization bump
|/  
*   dca38f6 -- Merge branch '122-fix-assessment-question-stepper' into 'master'
|\  
| * 3c22dab -- Resolve "Fix assessment question stepper"
|/  
* adcd8c6 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 37a41d4 -- [CI/CD] Update packages.json version based on GitLab tag.
*   caa5670 -- Merge branch '121-bump-version' into 'master'
|\  
| * 3f137db -- Bump version
|/  
*   e5eae2d -- Merge branch '120-fix-redirection-after-saving-ati' into 'master'
|\  
| * 0c8886a -- Fix redirect
|/  
* ed627a1 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 8effcae -- [CI/CD] Update packages.json version based on GitLab tag.
*   fc82c41 -- Merge branch '119-bump-visualization-versions' into 'master'
|\  
| * ec9ff9c -- Bump visualizations
|/  
* e326249 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* f3207f5 -- [CI/CD] Update packages.json version based on GitLab tag.
*   066382a -- Merge branch '117-modify-save-strategy-for-training-definition' into 'master'
|\  
| * 8db9243 -- Bump training api version and add tag message
| * 2422cd7 -- Fixed tests and saving strategy for adaptive ti
| * b69c7ff -- Adaptive instance save strategy
| * 89a2a8a -- Fix ti save strategy
| *   20775d1 -- Merge changes
| |\  
| | * 5d45198 -- fix saving problems
| | * d115ea6 -- Draft: Adaptive instance change save strategy
| * | 272c031 -- Draft: save fix
| |/  
| * 8280c43 -- Change save strategy for linear training instance
| * 56da3fe -- Fix problems with adaptive td save strategy, fix failing tests for linear and adaptive TD
| * 2777939 -- Prettier changes
| * ccab86c -- Adaptive definition save strategy changed
| * c01118f -- Fix save, change TD edit layout
| * 59ec2d9 -- Display level edit components when the training definition is created.
| * fe40b40 -- Fix save disabled logic when saving training definition and levels.
| * 82f19b6 -- Draft: change save strategy
* |   9be061b -- Merge branch '109-make-the-submit-button-more-visible-in-the-adaptive-training' into 'master'
|\ \  
| * | c7c8e10 -- Resolve "Make the submit button more visible in the adaptive training"
|/ /  
* |   3414c95 -- Merge branch '114-display-training-definition-id-when-selecting-training-definition-for-training-instance' into 'master'
|\ \  
| * | a2eae2c -- Fix assessment questions
|/ /  
* |   a910c12 -- Merge branch '115-display-default-value-of-the-input-fields-in-the-training-phase' into 'master'
|\ \  
| |/  
|/|   
| * d387e33 -- Added information about default value in wrong answers, allowed command and estimated duration input fields.
* |   19eaf37 -- Merge branch '116-add-node-modules-to-gitignore' into 'master'
|\ \  
| |/  
|/|   
| * a34dc2c -- Resolve "Add node modules to .gitignore"
|/  
* 45dacff -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 2751978 -- [CI/CD] Update packages.json version based on GitLab tag.
*   2077814 -- Merge branch '445537-master-patch-15953' into 'master'
|\  
| * d1903d2 -- Update VERSION.txt
|/  
*   6c93206 -- Merge branch '98-add-expansion-panel-with-related-questions-to-the-training-phase' into 'master'
|\  
| * 346787c -- Added expansion panel to training phase to display all related questions.
|/  
*   659722e -- Merge branch '93-integrate-functionality-for-automatic-problem-generation-apg' into 'master'
|\  
| * 5ea1298 -- Renaming variantAnswers to variantSandboxes and flagIdentifier to...
|/  
*   5939b2d -- Merge branch '112-trigger-form-validity-when-new-element-is-added' into 'master'
|\  
| * 3754e2f -- Resolve "Trigger form validity when new element is added"
|/  
*   a1e8b78 -- Merge branch '83-allow-movement-between-levels-in-preview-mode' into 'master'
|\  
| * 265181e -- Resolve "Allow movement between levels in preview mode"
|/  
*   afcd7bd -- Merge branch '99-fix-computation-of-the-free-sandboxes-in-the-training-instance-overview' into 'master'
|\  
| * 06d38bd -- Resolve "Fix computation of the free sandboxes in the training instance overview"
|/  
*   3f89758 -- Merge branch '111-rename-game-level-to-training-level' into 'master'
|\  
| * 345ecd6 -- Resolve "Rename game level to training level"
|/  
*   69acd54 -- Merge branch '110-rename-the-flag-attribute-to-answer-in-linear-training-definition' into 'master'
|\  
| * cc308c9 -- Resolve "Rename the flag attribute to answer in linear training definition"
|/  
*   9e88679 -- Merge branch '108-improve-the-text-in-the-modal-window-in-the-transition-process-between-adaptive-phases' into 'master'
|\  
| * 19bc340 -- Resolve "Improve the text in the modal window in the transition process between adaptive phases"
|/  
*   5dcd554 -- Merge branch '107-add-confirmation-for-deleting-instances' into 'master'
|\  
| * 04acc38 -- Resolve "Add confirmation for deleting instances"
* |   4d76117 -- Merge branch '102-fix-saving-discarding-of-changes-for-levels-phases' into 'master'
|\ \  
| |/  
|/|   
| * 517daae -- Resolve "Fix saving/discarding of changes for levels/phases"
|/  
*   feb0d00 -- Merge branch '103-add-missing-theme-styles-for-sentinel-markdown' into 'master'
|\  
| *   e2233bb -- Merge with latest changes
| |\  
| | *   7094223 -- Merge branch '92-rename-button-for-downloading-ssh-access' of gitlab.ics.muni.cz:muni-kypo-crp/frontend-angular/agendas/kypo-training-agenda into 92-rename-button-for-downloading-ssh-access
| | |\  
| | | * 6e7e4fc -- Remove unused import
| | | * 18c9685 -- Update ssh access buttons
| | * | a495d64 -- Remove unused import
| | * | 55f4648 -- Update ssh access buttons
| |/ /  
|/| |   
* | |   ae6f9bb -- Merge branch '105-fix-adaptive-questionnaire-ratining-form-questions' into 'master'
|\ \ \  
| * | | cb3418d -- Fix stepper, remove redundant array, fix rating forms
| | |/  
| |/|   
* | |   d6fde8d -- Merge branch '106-check-if-there-is-assigned-pool-when-downloading-management-access' into 'master'
|\ \ \  
| |/ /  
|/| |   
| * | 2d1a29f -- Disabled get ssh without pool
|/ /  
| * f3aaabf -- Move rating level select
| * 1618cef -- Add margin for markdown
| * 9a15055 -- Fix choices overflow
| * f38df4a -- Move delete question button
| * 6207292 -- Add markdown theme styles
|/  
*   144f367 -- Merge branch '95-use-stepper-for-questions-in-questionnaire-phase' into 'master'
|\  
| * 37c50b0 -- Resolve "Use stepper for questions in questionnaire phase"
* |   77a3886 -- Merge branch '92-rename-button-for-downloading-ssh-access' into 'master'
|\ \  
| |/  
|/|   
| * ea4bca6 -- Resolve "Rename button for downloading SSH access"
|/  
*   5f51e43 -- Merge branch '86-save-user-prefered-pagination-in-session' into 'master'
|\  
| * 235b1c5 -- Resolve "Save user prefered pagination in session"
|/  
*   18121d9 -- Merge branch '97-increase-the-separator-s-width-above-add-question-in-question-phase-relations' into 'master'
|\  
| * 0294f16 -- Resolve "Increase the separator's width above Add-Question in Question-Phase Relations"
|/  
*   e8881e7 -- Merge branch '101-specify-input-min-value-for-allowed-wrong-answers-commands-and-estimation-duration-in-training' into 'master'
|\  
| * 6a602dd -- Input min values specified for the allowed wrong answers, commands, and estimation duration.
* 5054495 -- Merge branch '96-rename-the-label-answer-to-correct-answer-in-the-tasks-of-training-phases' into 'master'
### 12.0.13 New version of the topology graph package - added missing configuration for Apache Guacamole.
* e838ee1 -- [CI/CD] Update packages.json version based on GitLab tag.
*   67b6b97 -- Merge branch '126-update-version-of-the-topology-graph-package' into 'master'
|\  
| * 96072e8 -- New version of the topology graph package with configuration for Guacamole.
|/  
* 338e3e9 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 7f786fa -- [CI/CD] Update packages.json version based on GitLab tag.
*   a11f544 -- Merge branch '123-add-option-to-create-default-content-on-create-training-definition-page' into 'master'
|\  
| * e1d2b14 -- Resolve "Add option to create default content on Create Training Definition page"
|/  
*   4189c82 -- Merge branch '113-add-detail-page-for-td' into 'master'
|\  
| * 5e50b44 -- Resolve "Add detail page for TD"
|/  
* 347d9f1 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* a8c8637 -- [CI/CD] Update packages.json version based on GitLab tag.
*   59daf8b -- Merge branch '124-create-tag-with-latest-changes' into 'master'
|\  
| * 9afda99 -- Tag message and overview visualization bump
|/  
*   dca38f6 -- Merge branch '122-fix-assessment-question-stepper' into 'master'
|\  
| * 3c22dab -- Resolve "Fix assessment question stepper"
|/  
* adcd8c6 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 37a41d4 -- [CI/CD] Update packages.json version based on GitLab tag.
*   caa5670 -- Merge branch '121-bump-version' into 'master'
|\  
| * 3f137db -- Bump version
|/  
*   e5eae2d -- Merge branch '120-fix-redirection-after-saving-ati' into 'master'
|\  
| * 0c8886a -- Fix redirect
|/  
* ed627a1 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 8effcae -- [CI/CD] Update packages.json version based on GitLab tag.
*   fc82c41 -- Merge branch '119-bump-visualization-versions' into 'master'
|\  
| * ec9ff9c -- Bump visualizations
|/  
* e326249 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* f3207f5 -- [CI/CD] Update packages.json version based on GitLab tag.
*   066382a -- Merge branch '117-modify-save-strategy-for-training-definition' into 'master'
|\  
| * 8db9243 -- Bump training api version and add tag message
| * 2422cd7 -- Fixed tests and saving strategy for adaptive ti
| * b69c7ff -- Adaptive instance save strategy
| * 89a2a8a -- Fix ti save strategy
| *   20775d1 -- Merge changes
| |\  
| | * 5d45198 -- fix saving problems
| | * d115ea6 -- Draft: Adaptive instance change save strategy
| * | 272c031 -- Draft: save fix
| |/  
| * 8280c43 -- Change save strategy for linear training instance
| * 56da3fe -- Fix problems with adaptive td save strategy, fix failing tests for linear and adaptive TD
| * 2777939 -- Prettier changes
| * ccab86c -- Adaptive definition save strategy changed
| * c01118f -- Fix save, change TD edit layout
| * 59ec2d9 -- Display level edit components when the training definition is created.
| * fe40b40 -- Fix save disabled logic when saving training definition and levels.
| * 82f19b6 -- Draft: change save strategy
* |   9be061b -- Merge branch '109-make-the-submit-button-more-visible-in-the-adaptive-training' into 'master'
|\ \  
| * | c7c8e10 -- Resolve "Make the submit button more visible in the adaptive training"
|/ /  
* |   3414c95 -- Merge branch '114-display-training-definition-id-when-selecting-training-definition-for-training-instance' into 'master'
|\ \  
| * | a2eae2c -- Fix assessment questions
|/ /  
* |   a910c12 -- Merge branch '115-display-default-value-of-the-input-fields-in-the-training-phase' into 'master'
|\ \  
| |/  
|/|   
| * d387e33 -- Added information about default value in wrong answers, allowed command and estimated duration input fields.
* |   19eaf37 -- Merge branch '116-add-node-modules-to-gitignore' into 'master'
|\ \  
| |/  
|/|   
| * a34dc2c -- Resolve "Add node modules to .gitignore"
|/  
* 45dacff -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 2751978 -- [CI/CD] Update packages.json version based on GitLab tag.
*   2077814 -- Merge branch '445537-master-patch-15953' into 'master'
|\  
| * d1903d2 -- Update VERSION.txt
|/  
*   6c93206 -- Merge branch '98-add-expansion-panel-with-related-questions-to-the-training-phase' into 'master'
|\  
| * 346787c -- Added expansion panel to training phase to display all related questions.
|/  
*   659722e -- Merge branch '93-integrate-functionality-for-automatic-problem-generation-apg' into 'master'
|\  
| * 5ea1298 -- Renaming variantAnswers to variantSandboxes and flagIdentifier to...
|/  
*   5939b2d -- Merge branch '112-trigger-form-validity-when-new-element-is-added' into 'master'
|\  
| * 3754e2f -- Resolve "Trigger form validity when new element is added"
|/  
*   a1e8b78 -- Merge branch '83-allow-movement-between-levels-in-preview-mode' into 'master'
|\  
| * 265181e -- Resolve "Allow movement between levels in preview mode"
|/  
*   afcd7bd -- Merge branch '99-fix-computation-of-the-free-sandboxes-in-the-training-instance-overview' into 'master'
|\  
| * 06d38bd -- Resolve "Fix computation of the free sandboxes in the training instance overview"
|/  
*   3f89758 -- Merge branch '111-rename-game-level-to-training-level' into 'master'
|\  
| * 345ecd6 -- Resolve "Rename game level to training level"
|/  
*   69acd54 -- Merge branch '110-rename-the-flag-attribute-to-answer-in-linear-training-definition' into 'master'
|\  
| * cc308c9 -- Resolve "Rename the flag attribute to answer in linear training definition"
|/  
*   9e88679 -- Merge branch '108-improve-the-text-in-the-modal-window-in-the-transition-process-between-adaptive-phases' into 'master'
|\  
| * 19bc340 -- Resolve "Improve the text in the modal window in the transition process between adaptive phases"
|/  
*   5dcd554 -- Merge branch '107-add-confirmation-for-deleting-instances' into 'master'
|\  
| * 04acc38 -- Resolve "Add confirmation for deleting instances"
* |   4d76117 -- Merge branch '102-fix-saving-discarding-of-changes-for-levels-phases' into 'master'
|\ \  
| |/  
|/|   
| * 517daae -- Resolve "Fix saving/discarding of changes for levels/phases"
|/  
*   feb0d00 -- Merge branch '103-add-missing-theme-styles-for-sentinel-markdown' into 'master'
|\  
| *   e2233bb -- Merge with latest changes
| |\  
| | *   7094223 -- Merge branch '92-rename-button-for-downloading-ssh-access' of gitlab.ics.muni.cz:muni-kypo-crp/frontend-angular/agendas/kypo-training-agenda into 92-rename-button-for-downloading-ssh-access
| | |\  
| | | * 6e7e4fc -- Remove unused import
| | | * 18c9685 -- Update ssh access buttons
| | * | a495d64 -- Remove unused import
| | * | 55f4648 -- Update ssh access buttons
| |/ /  
|/| |   
* | |   ae6f9bb -- Merge branch '105-fix-adaptive-questionnaire-ratining-form-questions' into 'master'
|\ \ \  
| * | | cb3418d -- Fix stepper, remove redundant array, fix rating forms
| | |/  
| |/|   
* | |   d6fde8d -- Merge branch '106-check-if-there-is-assigned-pool-when-downloading-management-access' into 'master'
|\ \ \  
| |/ /  
|/| |   
| * | 2d1a29f -- Disabled get ssh without pool
|/ /  
| * f3aaabf -- Move rating level select
| * 1618cef -- Add margin for markdown
| * 9a15055 -- Fix choices overflow
| * f38df4a -- Move delete question button
| * 6207292 -- Add markdown theme styles
|/  
*   144f367 -- Merge branch '95-use-stepper-for-questions-in-questionnaire-phase' into 'master'
|\  
| * 37c50b0 -- Resolve "Use stepper for questions in questionnaire phase"
* |   77a3886 -- Merge branch '92-rename-button-for-downloading-ssh-access' into 'master'
|\ \  
| |/  
|/|   
| * ea4bca6 -- Resolve "Rename button for downloading SSH access"
|/  
*   5f51e43 -- Merge branch '86-save-user-prefered-pagination-in-session' into 'master'
|\  
| * 235b1c5 -- Resolve "Save user prefered pagination in session"
|/  
*   18121d9 -- Merge branch '97-increase-the-separator-s-width-above-add-question-in-question-phase-relations' into 'master'
|\  
| * 0294f16 -- Resolve "Increase the separator's width above Add-Question in Question-Phase Relations"
|/  
*   e8881e7 -- Merge branch '101-specify-input-min-value-for-allowed-wrong-answers-commands-and-estimation-duration-in-training' into 'master'
|\  
| * 6a602dd -- Input min values specified for the allowed wrong answers, commands, and estimation duration.
|/  
*   5054495 -- Merge branch '96-rename-the-label-answer-to-correct-answer-in-the-tasks-of-training-phases' into 'master'
|\  
| * 07f7ac9 -- Label Answer renamed to Correct Answer.
* |   64cb89a -- Merge branch '100-modify-the-question-text-in-the-questionnaires-assessments-to-markdown' into 'master'
|\ \  
| |/  
|/|   
| * 6433541 -- Resolve "Modify the question text in the questionnaires/assessments to markdown"
|/  
*   038851f -- Merge branch '89-changes-in-one-free-form-question-propagate-to-all-others-in-assessment-level' into 'master'
|\  
| * c07e020 -- Resolve "Changes in one free form question propagate to all others in assessment level"
* |   430f379 -- Merge branch '90-clear-button-in-flag-field-in-training-run-not-working' into 'master'
|\ \  
| |/  
|/|   
| * 5fab08c -- Fixed flag clear button
|/  
*   f9b75f4 -- Merge branch '94-bump-version-of-sentinel' into 'master'
|\  
| * c0f6b63 -- Bump version of sentinel
* 8e6eeef -- Merge branch '91-provide-sanitize-function-for-markdown-editor-component' into 'master'
### 12.0.12 Add checkbox to support creation of default content in the training definition.
* 7f786fa -- [CI/CD] Update packages.json version based on GitLab tag.
*   a11f544 -- Merge branch '123-add-option-to-create-default-content-on-create-training-definition-page' into 'master'
|\  
| * e1d2b14 -- Resolve "Add option to create default content on Create Training Definition page"
|/  
*   4189c82 -- Merge branch '113-add-detail-page-for-td' into 'master'
|\  
| * 5e50b44 -- Resolve "Add detail page for TD"
|/  
* 347d9f1 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* a8c8637 -- [CI/CD] Update packages.json version based on GitLab tag.
*   59daf8b -- Merge branch '124-create-tag-with-latest-changes' into 'master'
|\  
| * 9afda99 -- Tag message and overview visualization bump
|/  
*   dca38f6 -- Merge branch '122-fix-assessment-question-stepper' into 'master'
|\  
| * 3c22dab -- Resolve "Fix assessment question stepper"
|/  
* adcd8c6 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 37a41d4 -- [CI/CD] Update packages.json version based on GitLab tag.
*   caa5670 -- Merge branch '121-bump-version' into 'master'
|\  
| * 3f137db -- Bump version
|/  
*   e5eae2d -- Merge branch '120-fix-redirection-after-saving-ati' into 'master'
|\  
| * 0c8886a -- Fix redirect
|/  
* ed627a1 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 8effcae -- [CI/CD] Update packages.json version based on GitLab tag.
*   fc82c41 -- Merge branch '119-bump-visualization-versions' into 'master'
|\  
| * ec9ff9c -- Bump visualizations
|/  
* e326249 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* f3207f5 -- [CI/CD] Update packages.json version based on GitLab tag.
*   066382a -- Merge branch '117-modify-save-strategy-for-training-definition' into 'master'
|\  
| * 8db9243 -- Bump training api version and add tag message
| * 2422cd7 -- Fixed tests and saving strategy for adaptive ti
| * b69c7ff -- Adaptive instance save strategy
| * 89a2a8a -- Fix ti save strategy
| *   20775d1 -- Merge changes
| |\  
| | * 5d45198 -- fix saving problems
| | * d115ea6 -- Draft: Adaptive instance change save strategy
| * | 272c031 -- Draft: save fix
| |/  
| * 8280c43 -- Change save strategy for linear training instance
| * 56da3fe -- Fix problems with adaptive td save strategy, fix failing tests for linear and adaptive TD
| * 2777939 -- Prettier changes
| * ccab86c -- Adaptive definition save strategy changed
| * c01118f -- Fix save, change TD edit layout
| * 59ec2d9 -- Display level edit components when the training definition is created.
| * fe40b40 -- Fix save disabled logic when saving training definition and levels.
| * 82f19b6 -- Draft: change save strategy
* |   9be061b -- Merge branch '109-make-the-submit-button-more-visible-in-the-adaptive-training' into 'master'
|\ \  
| * | c7c8e10 -- Resolve "Make the submit button more visible in the adaptive training"
|/ /  
* |   3414c95 -- Merge branch '114-display-training-definition-id-when-selecting-training-definition-for-training-instance' into 'master'
|\ \  
| * | a2eae2c -- Fix assessment questions
|/ /  
* |   a910c12 -- Merge branch '115-display-default-value-of-the-input-fields-in-the-training-phase' into 'master'
|\ \  
| |/  
|/|   
| * d387e33 -- Added information about default value in wrong answers, allowed command and estimated duration input fields.
* |   19eaf37 -- Merge branch '116-add-node-modules-to-gitignore' into 'master'
|\ \  
| |/  
|/|   
| * a34dc2c -- Resolve "Add node modules to .gitignore"
|/  
* 45dacff -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 2751978 -- [CI/CD] Update packages.json version based on GitLab tag.
*   2077814 -- Merge branch '445537-master-patch-15953' into 'master'
|\  
| * d1903d2 -- Update VERSION.txt
|/  
*   6c93206 -- Merge branch '98-add-expansion-panel-with-related-questions-to-the-training-phase' into 'master'
|\  
| * 346787c -- Added expansion panel to training phase to display all related questions.
|/  
*   659722e -- Merge branch '93-integrate-functionality-for-automatic-problem-generation-apg' into 'master'
|\  
| * 5ea1298 -- Renaming variantAnswers to variantSandboxes and flagIdentifier to...
|/  
*   5939b2d -- Merge branch '112-trigger-form-validity-when-new-element-is-added' into 'master'
|\  
| * 3754e2f -- Resolve "Trigger form validity when new element is added"
|/  
*   a1e8b78 -- Merge branch '83-allow-movement-between-levels-in-preview-mode' into 'master'
|\  
| * 265181e -- Resolve "Allow movement between levels in preview mode"
|/  
*   afcd7bd -- Merge branch '99-fix-computation-of-the-free-sandboxes-in-the-training-instance-overview' into 'master'
|\  
| * 06d38bd -- Resolve "Fix computation of the free sandboxes in the training instance overview"
|/  
*   3f89758 -- Merge branch '111-rename-game-level-to-training-level' into 'master'
|\  
| * 345ecd6 -- Resolve "Rename game level to training level"
|/  
*   69acd54 -- Merge branch '110-rename-the-flag-attribute-to-answer-in-linear-training-definition' into 'master'
|\  
| * cc308c9 -- Resolve "Rename the flag attribute to answer in linear training definition"
|/  
*   9e88679 -- Merge branch '108-improve-the-text-in-the-modal-window-in-the-transition-process-between-adaptive-phases' into 'master'
|\  
| * 19bc340 -- Resolve "Improve the text in the modal window in the transition process between adaptive phases"
|/  
*   5dcd554 -- Merge branch '107-add-confirmation-for-deleting-instances' into 'master'
|\  
| * 04acc38 -- Resolve "Add confirmation for deleting instances"
* |   4d76117 -- Merge branch '102-fix-saving-discarding-of-changes-for-levels-phases' into 'master'
|\ \  
| |/  
|/|   
| * 517daae -- Resolve "Fix saving/discarding of changes for levels/phases"
|/  
*   feb0d00 -- Merge branch '103-add-missing-theme-styles-for-sentinel-markdown' into 'master'
|\  
| *   e2233bb -- Merge with latest changes
| |\  
| | *   7094223 -- Merge branch '92-rename-button-for-downloading-ssh-access' of gitlab.ics.muni.cz:muni-kypo-crp/frontend-angular/agendas/kypo-training-agenda into 92-rename-button-for-downloading-ssh-access
| | |\  
| | | * 6e7e4fc -- Remove unused import
| | | * 18c9685 -- Update ssh access buttons
| | * | a495d64 -- Remove unused import
| | * | 55f4648 -- Update ssh access buttons
| |/ /  
|/| |   
* | |   ae6f9bb -- Merge branch '105-fix-adaptive-questionnaire-ratining-form-questions' into 'master'
|\ \ \  
| * | | cb3418d -- Fix stepper, remove redundant array, fix rating forms
| | |/  
| |/|   
* | |   d6fde8d -- Merge branch '106-check-if-there-is-assigned-pool-when-downloading-management-access' into 'master'
|\ \ \  
| |/ /  
|/| |   
| * | 2d1a29f -- Disabled get ssh without pool
|/ /  
| * f3aaabf -- Move rating level select
| * 1618cef -- Add margin for markdown
| * 9a15055 -- Fix choices overflow
| * f38df4a -- Move delete question button
| * 6207292 -- Add markdown theme styles
|/  
*   144f367 -- Merge branch '95-use-stepper-for-questions-in-questionnaire-phase' into 'master'
|\  
| * 37c50b0 -- Resolve "Use stepper for questions in questionnaire phase"
* |   77a3886 -- Merge branch '92-rename-button-for-downloading-ssh-access' into 'master'
|\ \  
| |/  
|/|   
| * ea4bca6 -- Resolve "Rename button for downloading SSH access"
|/  
*   5f51e43 -- Merge branch '86-save-user-prefered-pagination-in-session' into 'master'
|\  
| * 235b1c5 -- Resolve "Save user prefered pagination in session"
|/  
*   18121d9 -- Merge branch '97-increase-the-separator-s-width-above-add-question-in-question-phase-relations' into 'master'
|\  
| * 0294f16 -- Resolve "Increase the separator's width above Add-Question in Question-Phase Relations"
|/  
*   e8881e7 -- Merge branch '101-specify-input-min-value-for-allowed-wrong-answers-commands-and-estimation-duration-in-training' into 'master'
|\  
| * 6a602dd -- Input min values specified for the allowed wrong answers, commands, and estimation duration.
|/  
*   5054495 -- Merge branch '96-rename-the-label-answer-to-correct-answer-in-the-tasks-of-training-phases' into 'master'
|\  
| * 07f7ac9 -- Label Answer renamed to Correct Answer.
* |   64cb89a -- Merge branch '100-modify-the-question-text-in-the-questionnaires-assessments-to-markdown' into 'master'
|\ \  
| |/  
|/|   
| * 6433541 -- Resolve "Modify the question text in the questionnaires/assessments to markdown"
|/  
*   038851f -- Merge branch '89-changes-in-one-free-form-question-propagate-to-all-others-in-assessment-level' into 'master'
|\  
| * c07e020 -- Resolve "Changes in one free form question propagate to all others in assessment level"
* |   430f379 -- Merge branch '90-clear-button-in-flag-field-in-training-run-not-working' into 'master'
|\ \  
| |/  
|/|   
| * 5fab08c -- Fixed flag clear button
|/  
*   f9b75f4 -- Merge branch '94-bump-version-of-sentinel' into 'master'
|\  
| * c0f6b63 -- Bump version of sentinel
|/  
*   8e6eeef -- Merge branch '91-provide-sanitize-function-for-markdown-editor-component' into 'master'
|\  
| * 49f0ef3 -- Resolve "Provide sanitize function for markdown-editor component"
|/  
*   010604e -- Merge branch '88-fix-local-config-paths' into 'master'
|\  
| * 3c6ea3c -- Fix paths
|/  
*   c8346d3 -- Merge branch '87-add-build-example-app-to-ci' into 'master'
|\  
| * 4c91f53 -- Add build example app
* c5a1e07 -- Merge branch '84-use-stepper-for-questions-in-assessment-levels' into 'master'
### 12.0.10 Fix linear questions, latest overview visualization.
* a8c8637 -- [CI/CD] Update packages.json version based on GitLab tag.
*   59daf8b -- Merge branch '124-create-tag-with-latest-changes' into 'master'
|\  
| * 9afda99 -- Tag message and overview visualization bump
|/  
*   dca38f6 -- Merge branch '122-fix-assessment-question-stepper' into 'master'
|\  
| * 3c22dab -- Resolve "Fix assessment question stepper"
|/  
* adcd8c6 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 37a41d4 -- [CI/CD] Update packages.json version based on GitLab tag.
*   caa5670 -- Merge branch '121-bump-version' into 'master'
|\  
| * 3f137db -- Bump version
|/  
*   e5eae2d -- Merge branch '120-fix-redirection-after-saving-ati' into 'master'
|\  
| * 0c8886a -- Fix redirect
|/  
* ed627a1 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 8effcae -- [CI/CD] Update packages.json version based on GitLab tag.
*   fc82c41 -- Merge branch '119-bump-visualization-versions' into 'master'
|\  
| * ec9ff9c -- Bump visualizations
|/  
* e326249 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* f3207f5 -- [CI/CD] Update packages.json version based on GitLab tag.
*   066382a -- Merge branch '117-modify-save-strategy-for-training-definition' into 'master'
|\  
| * 8db9243 -- Bump training api version and add tag message
| * 2422cd7 -- Fixed tests and saving strategy for adaptive ti
| * b69c7ff -- Adaptive instance save strategy
| * 89a2a8a -- Fix ti save strategy
| *   20775d1 -- Merge changes
| |\  
| | * 5d45198 -- fix saving problems
| | * d115ea6 -- Draft: Adaptive instance change save strategy
| * | 272c031 -- Draft: save fix
| |/  
| * 8280c43 -- Change save strategy for linear training instance
| * 56da3fe -- Fix problems with adaptive td save strategy, fix failing tests for linear and adaptive TD
| * 2777939 -- Prettier changes
| * ccab86c -- Adaptive definition save strategy changed
| * c01118f -- Fix save, change TD edit layout
| * 59ec2d9 -- Display level edit components when the training definition is created.
| * fe40b40 -- Fix save disabled logic when saving training definition and levels.
| * 82f19b6 -- Draft: change save strategy
* |   9be061b -- Merge branch '109-make-the-submit-button-more-visible-in-the-adaptive-training' into 'master'
|\ \  
| * | c7c8e10 -- Resolve "Make the submit button more visible in the adaptive training"
|/ /  
* |   3414c95 -- Merge branch '114-display-training-definition-id-when-selecting-training-definition-for-training-instance' into 'master'
|\ \  
| * | a2eae2c -- Fix assessment questions
|/ /  
* |   a910c12 -- Merge branch '115-display-default-value-of-the-input-fields-in-the-training-phase' into 'master'
|\ \  
| |/  
|/|   
| * d387e33 -- Added information about default value in wrong answers, allowed command and estimated duration input fields.
* |   19eaf37 -- Merge branch '116-add-node-modules-to-gitignore' into 'master'
|\ \  
| |/  
|/|   
| * a34dc2c -- Resolve "Add node modules to .gitignore"
|/  
* 45dacff -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 2751978 -- [CI/CD] Update packages.json version based on GitLab tag.
*   2077814 -- Merge branch '445537-master-patch-15953' into 'master'
|\  
| * d1903d2 -- Update VERSION.txt
|/  
*   6c93206 -- Merge branch '98-add-expansion-panel-with-related-questions-to-the-training-phase' into 'master'
|\  
| * 346787c -- Added expansion panel to training phase to display all related questions.
|/  
*   659722e -- Merge branch '93-integrate-functionality-for-automatic-problem-generation-apg' into 'master'
|\  
| * 5ea1298 -- Renaming variantAnswers to variantSandboxes and flagIdentifier to...
|/  
*   5939b2d -- Merge branch '112-trigger-form-validity-when-new-element-is-added' into 'master'
|\  
| * 3754e2f -- Resolve "Trigger form validity when new element is added"
|/  
*   a1e8b78 -- Merge branch '83-allow-movement-between-levels-in-preview-mode' into 'master'
|\  
| * 265181e -- Resolve "Allow movement between levels in preview mode"
|/  
*   afcd7bd -- Merge branch '99-fix-computation-of-the-free-sandboxes-in-the-training-instance-overview' into 'master'
|\  
| * 06d38bd -- Resolve "Fix computation of the free sandboxes in the training instance overview"
|/  
*   3f89758 -- Merge branch '111-rename-game-level-to-training-level' into 'master'
|\  
| * 345ecd6 -- Resolve "Rename game level to training level"
|/  
*   69acd54 -- Merge branch '110-rename-the-flag-attribute-to-answer-in-linear-training-definition' into 'master'
|\  
| * cc308c9 -- Resolve "Rename the flag attribute to answer in linear training definition"
|/  
*   9e88679 -- Merge branch '108-improve-the-text-in-the-modal-window-in-the-transition-process-between-adaptive-phases' into 'master'
|\  
| * 19bc340 -- Resolve "Improve the text in the modal window in the transition process between adaptive phases"
|/  
*   5dcd554 -- Merge branch '107-add-confirmation-for-deleting-instances' into 'master'
|\  
| * 04acc38 -- Resolve "Add confirmation for deleting instances"
* |   4d76117 -- Merge branch '102-fix-saving-discarding-of-changes-for-levels-phases' into 'master'
|\ \  
| |/  
|/|   
| * 517daae -- Resolve "Fix saving/discarding of changes for levels/phases"
|/  
*   feb0d00 -- Merge branch '103-add-missing-theme-styles-for-sentinel-markdown' into 'master'
|\  
| *   e2233bb -- Merge with latest changes
| |\  
| | *   7094223 -- Merge branch '92-rename-button-for-downloading-ssh-access' of gitlab.ics.muni.cz:muni-kypo-crp/frontend-angular/agendas/kypo-training-agenda into 92-rename-button-for-downloading-ssh-access
| | |\  
| | | * 6e7e4fc -- Remove unused import
| | | * 18c9685 -- Update ssh access buttons
| | * | a495d64 -- Remove unused import
| | * | 55f4648 -- Update ssh access buttons
| |/ /  
|/| |   
* | |   ae6f9bb -- Merge branch '105-fix-adaptive-questionnaire-ratining-form-questions' into 'master'
|\ \ \  
| * | | cb3418d -- Fix stepper, remove redundant array, fix rating forms
| | |/  
| |/|   
* | |   d6fde8d -- Merge branch '106-check-if-there-is-assigned-pool-when-downloading-management-access' into 'master'
|\ \ \  
| |/ /  
|/| |   
| * | 2d1a29f -- Disabled get ssh without pool
|/ /  
| * f3aaabf -- Move rating level select
| * 1618cef -- Add margin for markdown
| * 9a15055 -- Fix choices overflow
| * f38df4a -- Move delete question button
| * 6207292 -- Add markdown theme styles
|/  
*   144f367 -- Merge branch '95-use-stepper-for-questions-in-questionnaire-phase' into 'master'
|\  
| * 37c50b0 -- Resolve "Use stepper for questions in questionnaire phase"
* |   77a3886 -- Merge branch '92-rename-button-for-downloading-ssh-access' into 'master'
|\ \  
| |/  
|/|   
| * ea4bca6 -- Resolve "Rename button for downloading SSH access"
|/  
*   5f51e43 -- Merge branch '86-save-user-prefered-pagination-in-session' into 'master'
|\  
| * 235b1c5 -- Resolve "Save user prefered pagination in session"
|/  
*   18121d9 -- Merge branch '97-increase-the-separator-s-width-above-add-question-in-question-phase-relations' into 'master'
|\  
| * 0294f16 -- Resolve "Increase the separator's width above Add-Question in Question-Phase Relations"
|/  
*   e8881e7 -- Merge branch '101-specify-input-min-value-for-allowed-wrong-answers-commands-and-estimation-duration-in-training' into 'master'
|\  
| * 6a602dd -- Input min values specified for the allowed wrong answers, commands, and estimation duration.
|/  
*   5054495 -- Merge branch '96-rename-the-label-answer-to-correct-answer-in-the-tasks-of-training-phases' into 'master'
|\  
| * 07f7ac9 -- Label Answer renamed to Correct Answer.
* |   64cb89a -- Merge branch '100-modify-the-question-text-in-the-questionnaires-assessments-to-markdown' into 'master'
|\ \  
| |/  
|/|   
| * 6433541 -- Resolve "Modify the question text in the questionnaires/assessments to markdown"
|/  
*   038851f -- Merge branch '89-changes-in-one-free-form-question-propagate-to-all-others-in-assessment-level' into 'master'
|\  
| * c07e020 -- Resolve "Changes in one free form question propagate to all others in assessment level"
* |   430f379 -- Merge branch '90-clear-button-in-flag-field-in-training-run-not-working' into 'master'
|\ \  
| |/  
|/|   
| * 5fab08c -- Fixed flag clear button
|/  
*   f9b75f4 -- Merge branch '94-bump-version-of-sentinel' into 'master'
|\  
| * c0f6b63 -- Bump version of sentinel
|/  
*   8e6eeef -- Merge branch '91-provide-sanitize-function-for-markdown-editor-component' into 'master'
|\  
| * 49f0ef3 -- Resolve "Provide sanitize function for markdown-editor component"
|/  
*   010604e -- Merge branch '88-fix-local-config-paths' into 'master'
|\  
| * 3c6ea3c -- Fix paths
|/  
*   c8346d3 -- Merge branch '87-add-build-example-app-to-ci' into 'master'
|\  
| * 4c91f53 -- Add build example app
|/  
*   c5a1e07 -- Merge branch '84-use-stepper-for-questions-in-assessment-levels' into 'master'
|\  
| * f647f42 -- Resolve "Use stepper for questions in assessment levels"
* |   147155e -- Merge branch '85-set-maximum-size-for-adaptive-questionnaire-to-1023' into 'master'
|\ \  
| * | 073bb01 -- Resolve "Set maximum size for adaptive questionnaire to 1023"
|/ /  
* |   cd94c46 -- Merge branch '82-change-functionality-of-submit-button-for-flags' into 'master'
|\ \  
| |/  
|/|   
| * f52903a -- Resolve "Change functionality of submit button for flags"
|/  
* d793dfe -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 867bd95 -- [CI/CD] Update packages.json version based on GitLab tag.
* 0ecac50 -- Merge branch '80-add-loading-for-overview-visualization-and-fix-questionare-points' into 'master'
### 12.0.9 Fix adaptive training instance edit redirect
* 37a41d4 -- [CI/CD] Update packages.json version based on GitLab tag.
*   caa5670 -- Merge branch '121-bump-version' into 'master'
|\  
| * 3f137db -- Bump version
|/  
*   e5eae2d -- Merge branch '120-fix-redirection-after-saving-ati' into 'master'
|\  
| * 0c8886a -- Fix redirect
|/  
* ed627a1 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 8effcae -- [CI/CD] Update packages.json version based on GitLab tag.
*   fc82c41 -- Merge branch '119-bump-visualization-versions' into 'master'
|\  
| * ec9ff9c -- Bump visualizations
|/  
* e326249 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* f3207f5 -- [CI/CD] Update packages.json version based on GitLab tag.
*   066382a -- Merge branch '117-modify-save-strategy-for-training-definition' into 'master'
|\  
| * 8db9243 -- Bump training api version and add tag message
| * 2422cd7 -- Fixed tests and saving strategy for adaptive ti
| * b69c7ff -- Adaptive instance save strategy
| * 89a2a8a -- Fix ti save strategy
| *   20775d1 -- Merge changes
| |\  
| | * 5d45198 -- fix saving problems
| | * d115ea6 -- Draft: Adaptive instance change save strategy
| * | 272c031 -- Draft: save fix
| |/  
| * 8280c43 -- Change save strategy for linear training instance
| * 56da3fe -- Fix problems with adaptive td save strategy, fix failing tests for linear and adaptive TD
| * 2777939 -- Prettier changes
| * ccab86c -- Adaptive definition save strategy changed
| * c01118f -- Fix save, change TD edit layout
| * 59ec2d9 -- Display level edit components when the training definition is created.
| * fe40b40 -- Fix save disabled logic when saving training definition and levels.
| * 82f19b6 -- Draft: change save strategy
* |   9be061b -- Merge branch '109-make-the-submit-button-more-visible-in-the-adaptive-training' into 'master'
|\ \  
| * | c7c8e10 -- Resolve "Make the submit button more visible in the adaptive training"
|/ /  
* |   3414c95 -- Merge branch '114-display-training-definition-id-when-selecting-training-definition-for-training-instance' into 'master'
|\ \  
| * | a2eae2c -- Fix assessment questions
|/ /  
* |   a910c12 -- Merge branch '115-display-default-value-of-the-input-fields-in-the-training-phase' into 'master'
|\ \  
| |/  
|/|   
| * d387e33 -- Added information about default value in wrong answers, allowed command and estimated duration input fields.
* |   19eaf37 -- Merge branch '116-add-node-modules-to-gitignore' into 'master'
|\ \  
| |/  
|/|   
| * a34dc2c -- Resolve "Add node modules to .gitignore"
|/  
* 45dacff -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 2751978 -- [CI/CD] Update packages.json version based on GitLab tag.
*   2077814 -- Merge branch '445537-master-patch-15953' into 'master'
|\  
| * d1903d2 -- Update VERSION.txt
|/  
*   6c93206 -- Merge branch '98-add-expansion-panel-with-related-questions-to-the-training-phase' into 'master'
|\  
| * 346787c -- Added expansion panel to training phase to display all related questions.
|/  
*   659722e -- Merge branch '93-integrate-functionality-for-automatic-problem-generation-apg' into 'master'
|\  
| * 5ea1298 -- Renaming variantAnswers to variantSandboxes and flagIdentifier to...
|/  
*   5939b2d -- Merge branch '112-trigger-form-validity-when-new-element-is-added' into 'master'
|\  
| * 3754e2f -- Resolve "Trigger form validity when new element is added"
|/  
*   a1e8b78 -- Merge branch '83-allow-movement-between-levels-in-preview-mode' into 'master'
|\  
| * 265181e -- Resolve "Allow movement between levels in preview mode"
|/  
*   afcd7bd -- Merge branch '99-fix-computation-of-the-free-sandboxes-in-the-training-instance-overview' into 'master'
|\  
| * 06d38bd -- Resolve "Fix computation of the free sandboxes in the training instance overview"
|/  
*   3f89758 -- Merge branch '111-rename-game-level-to-training-level' into 'master'
|\  
| * 345ecd6 -- Resolve "Rename game level to training level"
|/  
*   69acd54 -- Merge branch '110-rename-the-flag-attribute-to-answer-in-linear-training-definition' into 'master'
|\  
| * cc308c9 -- Resolve "Rename the flag attribute to answer in linear training definition"
|/  
*   9e88679 -- Merge branch '108-improve-the-text-in-the-modal-window-in-the-transition-process-between-adaptive-phases' into 'master'
|\  
| * 19bc340 -- Resolve "Improve the text in the modal window in the transition process between adaptive phases"
|/  
*   5dcd554 -- Merge branch '107-add-confirmation-for-deleting-instances' into 'master'
|\  
| * 04acc38 -- Resolve "Add confirmation for deleting instances"
* |   4d76117 -- Merge branch '102-fix-saving-discarding-of-changes-for-levels-phases' into 'master'
|\ \  
| |/  
|/|   
| * 517daae -- Resolve "Fix saving/discarding of changes for levels/phases"
|/  
*   feb0d00 -- Merge branch '103-add-missing-theme-styles-for-sentinel-markdown' into 'master'
|\  
| *   e2233bb -- Merge with latest changes
| |\  
| | *   7094223 -- Merge branch '92-rename-button-for-downloading-ssh-access' of gitlab.ics.muni.cz:muni-kypo-crp/frontend-angular/agendas/kypo-training-agenda into 92-rename-button-for-downloading-ssh-access
| | |\  
| | | * 6e7e4fc -- Remove unused import
| | | * 18c9685 -- Update ssh access buttons
| | * | a495d64 -- Remove unused import
| | * | 55f4648 -- Update ssh access buttons
| |/ /  
|/| |   
* | |   ae6f9bb -- Merge branch '105-fix-adaptive-questionnaire-ratining-form-questions' into 'master'
|\ \ \  
| * | | cb3418d -- Fix stepper, remove redundant array, fix rating forms
| | |/  
| |/|   
* | |   d6fde8d -- Merge branch '106-check-if-there-is-assigned-pool-when-downloading-management-access' into 'master'
|\ \ \  
| |/ /  
|/| |   
| * | 2d1a29f -- Disabled get ssh without pool
|/ /  
| * f3aaabf -- Move rating level select
| * 1618cef -- Add margin for markdown
| * 9a15055 -- Fix choices overflow
| * f38df4a -- Move delete question button
| * 6207292 -- Add markdown theme styles
|/  
*   144f367 -- Merge branch '95-use-stepper-for-questions-in-questionnaire-phase' into 'master'
|\  
| * 37c50b0 -- Resolve "Use stepper for questions in questionnaire phase"
* |   77a3886 -- Merge branch '92-rename-button-for-downloading-ssh-access' into 'master'
|\ \  
| |/  
|/|   
| * ea4bca6 -- Resolve "Rename button for downloading SSH access"
|/  
*   5f51e43 -- Merge branch '86-save-user-prefered-pagination-in-session' into 'master'
|\  
| * 235b1c5 -- Resolve "Save user prefered pagination in session"
|/  
*   18121d9 -- Merge branch '97-increase-the-separator-s-width-above-add-question-in-question-phase-relations' into 'master'
|\  
| * 0294f16 -- Resolve "Increase the separator's width above Add-Question in Question-Phase Relations"
|/  
*   e8881e7 -- Merge branch '101-specify-input-min-value-for-allowed-wrong-answers-commands-and-estimation-duration-in-training' into 'master'
|\  
| * 6a602dd -- Input min values specified for the allowed wrong answers, commands, and estimation duration.
|/  
*   5054495 -- Merge branch '96-rename-the-label-answer-to-correct-answer-in-the-tasks-of-training-phases' into 'master'
|\  
| * 07f7ac9 -- Label Answer renamed to Correct Answer.
* |   64cb89a -- Merge branch '100-modify-the-question-text-in-the-questionnaires-assessments-to-markdown' into 'master'
|\ \  
| |/  
|/|   
| * 6433541 -- Resolve "Modify the question text in the questionnaires/assessments to markdown"
|/  
*   038851f -- Merge branch '89-changes-in-one-free-form-question-propagate-to-all-others-in-assessment-level' into 'master'
|\  
| * c07e020 -- Resolve "Changes in one free form question propagate to all others in assessment level"
* |   430f379 -- Merge branch '90-clear-button-in-flag-field-in-training-run-not-working' into 'master'
|\ \  
| |/  
|/|   
| * 5fab08c -- Fixed flag clear button
|/  
*   f9b75f4 -- Merge branch '94-bump-version-of-sentinel' into 'master'
|\  
| * c0f6b63 -- Bump version of sentinel
|/  
*   8e6eeef -- Merge branch '91-provide-sanitize-function-for-markdown-editor-component' into 'master'
|\  
| * 49f0ef3 -- Resolve "Provide sanitize function for markdown-editor component"
|/  
*   010604e -- Merge branch '88-fix-local-config-paths' into 'master'
|\  
| * 3c6ea3c -- Fix paths
|/  
*   c8346d3 -- Merge branch '87-add-build-example-app-to-ci' into 'master'
|\  
| * 4c91f53 -- Add build example app
|/  
*   c5a1e07 -- Merge branch '84-use-stepper-for-questions-in-assessment-levels' into 'master'
|\  
| * f647f42 -- Resolve "Use stepper for questions in assessment levels"
* |   147155e -- Merge branch '85-set-maximum-size-for-adaptive-questionnaire-to-1023' into 'master'
|\ \  
| * | 073bb01 -- Resolve "Set maximum size for adaptive questionnaire to 1023"
|/ /  
* |   cd94c46 -- Merge branch '82-change-functionality-of-submit-button-for-flags' into 'master'
|\ \  
| |/  
|/|   
| * f52903a -- Resolve "Change functionality of submit button for flags"
|/  
* d793dfe -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 867bd95 -- [CI/CD] Update packages.json version based on GitLab tag.
*   0ecac50 -- Merge branch '80-add-loading-for-overview-visualization-and-fix-questionare-points' into 'master'
|\  
| * dad42c0 -- Resolve "Add loading for overview visualization and fix questionare points"
|/  
* dfb6e95 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 97891e5 -- [CI/CD] Update packages.json version based on GitLab tag.
*   3d58a8e -- Merge branch '81-simplify-gitlab-ci-cd-using-csirt-mu-docker-image' into 'master'
|\  
| * b1be3ab -- Update gitlab CI
* c764397 -- Update project package.json version based on GitLab tag. Done by CI
### 12.0.8 Bump visualizations to latest versions.
* 8effcae -- [CI/CD] Update packages.json version based on GitLab tag.
*   fc82c41 -- Merge branch '119-bump-visualization-versions' into 'master'
|\  
| * ec9ff9c -- Bump visualizations
|/  
* e326249 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* f3207f5 -- [CI/CD] Update packages.json version based on GitLab tag.
*   066382a -- Merge branch '117-modify-save-strategy-for-training-definition' into 'master'
|\  
| * 8db9243 -- Bump training api version and add tag message
| * 2422cd7 -- Fixed tests and saving strategy for adaptive ti
| * b69c7ff -- Adaptive instance save strategy
| * 89a2a8a -- Fix ti save strategy
| *   20775d1 -- Merge changes
| |\  
| | * 5d45198 -- fix saving problems
| | * d115ea6 -- Draft: Adaptive instance change save strategy
| * | 272c031 -- Draft: save fix
| |/  
| * 8280c43 -- Change save strategy for linear training instance
| * 56da3fe -- Fix problems with adaptive td save strategy, fix failing tests for linear and adaptive TD
| * 2777939 -- Prettier changes
| * ccab86c -- Adaptive definition save strategy changed
| * c01118f -- Fix save, change TD edit layout
| * 59ec2d9 -- Display level edit components when the training definition is created.
| * fe40b40 -- Fix save disabled logic when saving training definition and levels.
| * 82f19b6 -- Draft: change save strategy
* |   9be061b -- Merge branch '109-make-the-submit-button-more-visible-in-the-adaptive-training' into 'master'
|\ \  
| * | c7c8e10 -- Resolve "Make the submit button more visible in the adaptive training"
|/ /  
* |   3414c95 -- Merge branch '114-display-training-definition-id-when-selecting-training-definition-for-training-instance' into 'master'
|\ \  
| * | a2eae2c -- Fix assessment questions
|/ /  
* |   a910c12 -- Merge branch '115-display-default-value-of-the-input-fields-in-the-training-phase' into 'master'
|\ \  
| |/  
|/|   
| * d387e33 -- Added information about default value in wrong answers, allowed command and estimated duration input fields.
* |   19eaf37 -- Merge branch '116-add-node-modules-to-gitignore' into 'master'
|\ \  
| |/  
|/|   
| * a34dc2c -- Resolve "Add node modules to .gitignore"
|/  
* 45dacff -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 2751978 -- [CI/CD] Update packages.json version based on GitLab tag.
*   2077814 -- Merge branch '445537-master-patch-15953' into 'master'
|\  
| * d1903d2 -- Update VERSION.txt
|/  
*   6c93206 -- Merge branch '98-add-expansion-panel-with-related-questions-to-the-training-phase' into 'master'
|\  
| * 346787c -- Added expansion panel to training phase to display all related questions.
|/  
*   659722e -- Merge branch '93-integrate-functionality-for-automatic-problem-generation-apg' into 'master'
|\  
| * 5ea1298 -- Renaming variantAnswers to variantSandboxes and flagIdentifier to...
|/  
*   5939b2d -- Merge branch '112-trigger-form-validity-when-new-element-is-added' into 'master'
|\  
| * 3754e2f -- Resolve "Trigger form validity when new element is added"
|/  
*   a1e8b78 -- Merge branch '83-allow-movement-between-levels-in-preview-mode' into 'master'
|\  
| * 265181e -- Resolve "Allow movement between levels in preview mode"
|/  
*   afcd7bd -- Merge branch '99-fix-computation-of-the-free-sandboxes-in-the-training-instance-overview' into 'master'
|\  
| * 06d38bd -- Resolve "Fix computation of the free sandboxes in the training instance overview"
|/  
*   3f89758 -- Merge branch '111-rename-game-level-to-training-level' into 'master'
|\  
| * 345ecd6 -- Resolve "Rename game level to training level"
|/  
*   69acd54 -- Merge branch '110-rename-the-flag-attribute-to-answer-in-linear-training-definition' into 'master'
|\  
| * cc308c9 -- Resolve "Rename the flag attribute to answer in linear training definition"
|/  
*   9e88679 -- Merge branch '108-improve-the-text-in-the-modal-window-in-the-transition-process-between-adaptive-phases' into 'master'
|\  
| * 19bc340 -- Resolve "Improve the text in the modal window in the transition process between adaptive phases"
|/  
*   5dcd554 -- Merge branch '107-add-confirmation-for-deleting-instances' into 'master'
|\  
| * 04acc38 -- Resolve "Add confirmation for deleting instances"
* |   4d76117 -- Merge branch '102-fix-saving-discarding-of-changes-for-levels-phases' into 'master'
|\ \  
| |/  
|/|   
| * 517daae -- Resolve "Fix saving/discarding of changes for levels/phases"
|/  
*   feb0d00 -- Merge branch '103-add-missing-theme-styles-for-sentinel-markdown' into 'master'
|\  
| *   e2233bb -- Merge with latest changes
| |\  
| | *   7094223 -- Merge branch '92-rename-button-for-downloading-ssh-access' of gitlab.ics.muni.cz:muni-kypo-crp/frontend-angular/agendas/kypo-training-agenda into 92-rename-button-for-downloading-ssh-access
| | |\  
| | | * 6e7e4fc -- Remove unused import
| | | * 18c9685 -- Update ssh access buttons
| | * | a495d64 -- Remove unused import
| | * | 55f4648 -- Update ssh access buttons
| |/ /  
|/| |   
* | |   ae6f9bb -- Merge branch '105-fix-adaptive-questionnaire-ratining-form-questions' into 'master'
|\ \ \  
| * | | cb3418d -- Fix stepper, remove redundant array, fix rating forms
| | |/  
| |/|   
* | |   d6fde8d -- Merge branch '106-check-if-there-is-assigned-pool-when-downloading-management-access' into 'master'
|\ \ \  
| |/ /  
|/| |   
| * | 2d1a29f -- Disabled get ssh without pool
|/ /  
| * f3aaabf -- Move rating level select
| * 1618cef -- Add margin for markdown
| * 9a15055 -- Fix choices overflow
| * f38df4a -- Move delete question button
| * 6207292 -- Add markdown theme styles
|/  
*   144f367 -- Merge branch '95-use-stepper-for-questions-in-questionnaire-phase' into 'master'
|\  
| * 37c50b0 -- Resolve "Use stepper for questions in questionnaire phase"
* |   77a3886 -- Merge branch '92-rename-button-for-downloading-ssh-access' into 'master'
|\ \  
| |/  
|/|   
| * ea4bca6 -- Resolve "Rename button for downloading SSH access"
|/  
*   5f51e43 -- Merge branch '86-save-user-prefered-pagination-in-session' into 'master'
|\  
| * 235b1c5 -- Resolve "Save user prefered pagination in session"
|/  
*   18121d9 -- Merge branch '97-increase-the-separator-s-width-above-add-question-in-question-phase-relations' into 'master'
|\  
| * 0294f16 -- Resolve "Increase the separator's width above Add-Question in Question-Phase Relations"
|/  
*   e8881e7 -- Merge branch '101-specify-input-min-value-for-allowed-wrong-answers-commands-and-estimation-duration-in-training' into 'master'
|\  
| * 6a602dd -- Input min values specified for the allowed wrong answers, commands, and estimation duration.
|/  
*   5054495 -- Merge branch '96-rename-the-label-answer-to-correct-answer-in-the-tasks-of-training-phases' into 'master'
|\  
| * 07f7ac9 -- Label Answer renamed to Correct Answer.
* |   64cb89a -- Merge branch '100-modify-the-question-text-in-the-questionnaires-assessments-to-markdown' into 'master'
|\ \  
| |/  
|/|   
| * 6433541 -- Resolve "Modify the question text in the questionnaires/assessments to markdown"
|/  
*   038851f -- Merge branch '89-changes-in-one-free-form-question-propagate-to-all-others-in-assessment-level' into 'master'
|\  
| * c07e020 -- Resolve "Changes in one free form question propagate to all others in assessment level"
* |   430f379 -- Merge branch '90-clear-button-in-flag-field-in-training-run-not-working' into 'master'
|\ \  
| |/  
|/|   
| * 5fab08c -- Fixed flag clear button
|/  
*   f9b75f4 -- Merge branch '94-bump-version-of-sentinel' into 'master'
|\  
| * c0f6b63 -- Bump version of sentinel
|/  
*   8e6eeef -- Merge branch '91-provide-sanitize-function-for-markdown-editor-component' into 'master'
|\  
| * 49f0ef3 -- Resolve "Provide sanitize function for markdown-editor component"
|/  
*   010604e -- Merge branch '88-fix-local-config-paths' into 'master'
|\  
| * 3c6ea3c -- Fix paths
|/  
*   c8346d3 -- Merge branch '87-add-build-example-app-to-ci' into 'master'
|\  
| * 4c91f53 -- Add build example app
|/  
*   c5a1e07 -- Merge branch '84-use-stepper-for-questions-in-assessment-levels' into 'master'
|\  
| * f647f42 -- Resolve "Use stepper for questions in assessment levels"
* |   147155e -- Merge branch '85-set-maximum-size-for-adaptive-questionnaire-to-1023' into 'master'
|\ \  
| * | 073bb01 -- Resolve "Set maximum size for adaptive questionnaire to 1023"
|/ /  
* |   cd94c46 -- Merge branch '82-change-functionality-of-submit-button-for-flags' into 'master'
|\ \  
| |/  
|/|   
| * f52903a -- Resolve "Change functionality of submit button for flags"
|/  
* d793dfe -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 867bd95 -- [CI/CD] Update packages.json version based on GitLab tag.
*   0ecac50 -- Merge branch '80-add-loading-for-overview-visualization-and-fix-questionare-points' into 'master'
|\  
| * dad42c0 -- Resolve "Add loading for overview visualization and fix questionare points"
|/  
* dfb6e95 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 97891e5 -- [CI/CD] Update packages.json version based on GitLab tag.
*   3d58a8e -- Merge branch '81-simplify-gitlab-ci-cd-using-csirt-mu-docker-image' into 'master'
|\  
| * b1be3ab -- Update gitlab CI
|/  
* c764397 -- Update project package.json version based on GitLab tag. Done by CI
*   aa79008 -- Merge branch '79-bump-version-of-overview-visualization' into 'master'
|\  
| * e6eb1ac -- Bump overview visualization version
|/  
* f8a11e5 -- Update project package.json version based on GitLab tag. Done by CI
*   da1b525 -- Merge branch '78-bump-sentinel-layout-version' into 'master'
|\  
| * edd8903 -- Resolve "Bump sentinel layout version"
* 9b70cd2 -- Update project package.json version based on GitLab tag. Done by CI
### 12.0.7 Modify save strategy for definitions and instances. Change training run hint, solution and submit buttons position and design.
* f3207f5 -- [CI/CD] Update packages.json version based on GitLab tag.
*   066382a -- Merge branch '117-modify-save-strategy-for-training-definition' into 'master'
|\  
| * 8db9243 -- Bump training api version and add tag message
| * 2422cd7 -- Fixed tests and saving strategy for adaptive ti
| * b69c7ff -- Adaptive instance save strategy
| * 89a2a8a -- Fix ti save strategy
| *   20775d1 -- Merge changes
| |\  
| | * 5d45198 -- fix saving problems
| | * d115ea6 -- Draft: Adaptive instance change save strategy
| * | 272c031 -- Draft: save fix
| |/  
| * 8280c43 -- Change save strategy for linear training instance
| * 56da3fe -- Fix problems with adaptive td save strategy, fix failing tests for linear and adaptive TD
| * 2777939 -- Prettier changes
| * ccab86c -- Adaptive definition save strategy changed
| * c01118f -- Fix save, change TD edit layout
| * 59ec2d9 -- Display level edit components when the training definition is created.
| * fe40b40 -- Fix save disabled logic when saving training definition and levels.
| * 82f19b6 -- Draft: change save strategy
* |   9be061b -- Merge branch '109-make-the-submit-button-more-visible-in-the-adaptive-training' into 'master'
|\ \  
| * | c7c8e10 -- Resolve "Make the submit button more visible in the adaptive training"
|/ /  
* |   3414c95 -- Merge branch '114-display-training-definition-id-when-selecting-training-definition-for-training-instance' into 'master'
|\ \  
| * | a2eae2c -- Fix assessment questions
|/ /  
* |   a910c12 -- Merge branch '115-display-default-value-of-the-input-fields-in-the-training-phase' into 'master'
|\ \  
| |/  
|/|   
| * d387e33 -- Added information about default value in wrong answers, allowed command and estimated duration input fields.
* |   19eaf37 -- Merge branch '116-add-node-modules-to-gitignore' into 'master'
|\ \  
| |/  
|/|   
| * a34dc2c -- Resolve "Add node modules to .gitignore"
|/  
* 45dacff -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 2751978 -- [CI/CD] Update packages.json version based on GitLab tag.
*   2077814 -- Merge branch '445537-master-patch-15953' into 'master'
|\  
| * d1903d2 -- Update VERSION.txt
|/  
*   6c93206 -- Merge branch '98-add-expansion-panel-with-related-questions-to-the-training-phase' into 'master'
|\  
| * 346787c -- Added expansion panel to training phase to display all related questions.
|/  
*   659722e -- Merge branch '93-integrate-functionality-for-automatic-problem-generation-apg' into 'master'
|\  
| * 5ea1298 -- Renaming variantAnswers to variantSandboxes and flagIdentifier to...
|/  
*   5939b2d -- Merge branch '112-trigger-form-validity-when-new-element-is-added' into 'master'
|\  
| * 3754e2f -- Resolve "Trigger form validity when new element is added"
|/  
*   a1e8b78 -- Merge branch '83-allow-movement-between-levels-in-preview-mode' into 'master'
|\  
| * 265181e -- Resolve "Allow movement between levels in preview mode"
|/  
*   afcd7bd -- Merge branch '99-fix-computation-of-the-free-sandboxes-in-the-training-instance-overview' into 'master'
|\  
| * 06d38bd -- Resolve "Fix computation of the free sandboxes in the training instance overview"
|/  
*   3f89758 -- Merge branch '111-rename-game-level-to-training-level' into 'master'
|\  
| * 345ecd6 -- Resolve "Rename game level to training level"
|/  
*   69acd54 -- Merge branch '110-rename-the-flag-attribute-to-answer-in-linear-training-definition' into 'master'
|\  
| * cc308c9 -- Resolve "Rename the flag attribute to answer in linear training definition"
|/  
*   9e88679 -- Merge branch '108-improve-the-text-in-the-modal-window-in-the-transition-process-between-adaptive-phases' into 'master'
|\  
| * 19bc340 -- Resolve "Improve the text in the modal window in the transition process between adaptive phases"
|/  
*   5dcd554 -- Merge branch '107-add-confirmation-for-deleting-instances' into 'master'
|\  
| * 04acc38 -- Resolve "Add confirmation for deleting instances"
* |   4d76117 -- Merge branch '102-fix-saving-discarding-of-changes-for-levels-phases' into 'master'
|\ \  
| |/  
|/|   
| * 517daae -- Resolve "Fix saving/discarding of changes for levels/phases"
|/  
*   feb0d00 -- Merge branch '103-add-missing-theme-styles-for-sentinel-markdown' into 'master'
|\  
| *   e2233bb -- Merge with latest changes
| |\  
| | *   7094223 -- Merge branch '92-rename-button-for-downloading-ssh-access' of gitlab.ics.muni.cz:muni-kypo-crp/frontend-angular/agendas/kypo-training-agenda into 92-rename-button-for-downloading-ssh-access
| | |\  
| | | * 6e7e4fc -- Remove unused import
| | | * 18c9685 -- Update ssh access buttons
| | * | a495d64 -- Remove unused import
| | * | 55f4648 -- Update ssh access buttons
| |/ /  
|/| |   
* | |   ae6f9bb -- Merge branch '105-fix-adaptive-questionnaire-ratining-form-questions' into 'master'
|\ \ \  
| * | | cb3418d -- Fix stepper, remove redundant array, fix rating forms
| | |/  
| |/|   
* | |   d6fde8d -- Merge branch '106-check-if-there-is-assigned-pool-when-downloading-management-access' into 'master'
|\ \ \  
| |/ /  
|/| |   
| * | 2d1a29f -- Disabled get ssh without pool
|/ /  
| * f3aaabf -- Move rating level select
| * 1618cef -- Add margin for markdown
| * 9a15055 -- Fix choices overflow
| * f38df4a -- Move delete question button
| * 6207292 -- Add markdown theme styles
|/  
*   144f367 -- Merge branch '95-use-stepper-for-questions-in-questionnaire-phase' into 'master'
|\  
| * 37c50b0 -- Resolve "Use stepper for questions in questionnaire phase"
* |   77a3886 -- Merge branch '92-rename-button-for-downloading-ssh-access' into 'master'
|\ \  
| |/  
|/|   
| * ea4bca6 -- Resolve "Rename button for downloading SSH access"
|/  
*   5f51e43 -- Merge branch '86-save-user-prefered-pagination-in-session' into 'master'
|\  
| * 235b1c5 -- Resolve "Save user prefered pagination in session"
|/  
*   18121d9 -- Merge branch '97-increase-the-separator-s-width-above-add-question-in-question-phase-relations' into 'master'
|\  
| * 0294f16 -- Resolve "Increase the separator's width above Add-Question in Question-Phase Relations"
|/  
*   e8881e7 -- Merge branch '101-specify-input-min-value-for-allowed-wrong-answers-commands-and-estimation-duration-in-training' into 'master'
|\  
| * 6a602dd -- Input min values specified for the allowed wrong answers, commands, and estimation duration.
|/  
*   5054495 -- Merge branch '96-rename-the-label-answer-to-correct-answer-in-the-tasks-of-training-phases' into 'master'
|\  
| * 07f7ac9 -- Label Answer renamed to Correct Answer.
* |   64cb89a -- Merge branch '100-modify-the-question-text-in-the-questionnaires-assessments-to-markdown' into 'master'
|\ \  
| |/  
|/|   
| * 6433541 -- Resolve "Modify the question text in the questionnaires/assessments to markdown"
|/  
*   038851f -- Merge branch '89-changes-in-one-free-form-question-propagate-to-all-others-in-assessment-level' into 'master'
|\  
| * c07e020 -- Resolve "Changes in one free form question propagate to all others in assessment level"
* |   430f379 -- Merge branch '90-clear-button-in-flag-field-in-training-run-not-working' into 'master'
|\ \  
| |/  
|/|   
| * 5fab08c -- Fixed flag clear button
|/  
*   f9b75f4 -- Merge branch '94-bump-version-of-sentinel' into 'master'
|\  
| * c0f6b63 -- Bump version of sentinel
|/  
*   8e6eeef -- Merge branch '91-provide-sanitize-function-for-markdown-editor-component' into 'master'
|\  
| * 49f0ef3 -- Resolve "Provide sanitize function for markdown-editor component"
|/  
*   010604e -- Merge branch '88-fix-local-config-paths' into 'master'
|\  
| * 3c6ea3c -- Fix paths
|/  
*   c8346d3 -- Merge branch '87-add-build-example-app-to-ci' into 'master'
|\  
| * 4c91f53 -- Add build example app
|/  
*   c5a1e07 -- Merge branch '84-use-stepper-for-questions-in-assessment-levels' into 'master'
|\  
| * f647f42 -- Resolve "Use stepper for questions in assessment levels"
* |   147155e -- Merge branch '85-set-maximum-size-for-adaptive-questionnaire-to-1023' into 'master'
|\ \  
| * | 073bb01 -- Resolve "Set maximum size for adaptive questionnaire to 1023"
|/ /  
* |   cd94c46 -- Merge branch '82-change-functionality-of-submit-button-for-flags' into 'master'
|\ \  
| |/  
|/|   
| * f52903a -- Resolve "Change functionality of submit button for flags"
|/  
* d793dfe -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 867bd95 -- [CI/CD] Update packages.json version based on GitLab tag.
*   0ecac50 -- Merge branch '80-add-loading-for-overview-visualization-and-fix-questionare-points' into 'master'
|\  
| * dad42c0 -- Resolve "Add loading for overview visualization and fix questionare points"
|/  
* dfb6e95 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 97891e5 -- [CI/CD] Update packages.json version based on GitLab tag.
*   3d58a8e -- Merge branch '81-simplify-gitlab-ci-cd-using-csirt-mu-docker-image' into 'master'
|\  
| * b1be3ab -- Update gitlab CI
|/  
* c764397 -- Update project package.json version based on GitLab tag. Done by CI
*   aa79008 -- Merge branch '79-bump-version-of-overview-visualization' into 'master'
|\  
| * e6eb1ac -- Bump overview visualization version
|/  
* f8a11e5 -- Update project package.json version based on GitLab tag. Done by CI
*   da1b525 -- Merge branch '78-bump-sentinel-layout-version' into 'master'
|\  
| * edd8903 -- Resolve "Bump sentinel layout version"
|/  
* 9b70cd2 -- Update project package.json version based on GitLab tag. Done by CI
*   5a1f207 -- Merge branch '77-bump-version-of-sentinel' into 'master'
|\  
| * 8d8f3c3 -- Resolve "Bump version of Sentinel"
|/  
* d6158db -- Update project package.json version based on GitLab tag. Done by CI
* ff6c3f3 -- Merge branch '76-update-to-angular-12' into 'master'
### 12.0.6 Stepper for questions, sanitize function for markdown, change input to markdown for question text, rename flag to answer and game level to training level, save user preffered pagination, rename get SSH button, fix - number of free sandboxes, movement between levels in preview mode, integration of the APG functionality, display all related questions in training phase.
* 2751978 -- [CI/CD] Update packages.json version based on GitLab tag.
*   2077814 -- Merge branch '445537-master-patch-15953' into 'master'
|\  
| * d1903d2 -- Update VERSION.txt
|/  
*   6c93206 -- Merge branch '98-add-expansion-panel-with-related-questions-to-the-training-phase' into 'master'
|\  
| * 346787c -- Added expansion panel to training phase to display all related questions.
|/  
*   659722e -- Merge branch '93-integrate-functionality-for-automatic-problem-generation-apg' into 'master'
|\  
| * 5ea1298 -- Renaming variantAnswers to variantSandboxes and flagIdentifier to...
|/  
*   5939b2d -- Merge branch '112-trigger-form-validity-when-new-element-is-added' into 'master'
|\  
| * 3754e2f -- Resolve "Trigger form validity when new element is added"
|/  
*   a1e8b78 -- Merge branch '83-allow-movement-between-levels-in-preview-mode' into 'master'
|\  
| * 265181e -- Resolve "Allow movement between levels in preview mode"
|/  
*   afcd7bd -- Merge branch '99-fix-computation-of-the-free-sandboxes-in-the-training-instance-overview' into 'master'
|\  
| * 06d38bd -- Resolve "Fix computation of the free sandboxes in the training instance overview"
|/  
*   3f89758 -- Merge branch '111-rename-game-level-to-training-level' into 'master'
|\  
| * 345ecd6 -- Resolve "Rename game level to training level"
|/  
*   69acd54 -- Merge branch '110-rename-the-flag-attribute-to-answer-in-linear-training-definition' into 'master'
|\  
| * cc308c9 -- Resolve "Rename the flag attribute to answer in linear training definition"
|/  
*   9e88679 -- Merge branch '108-improve-the-text-in-the-modal-window-in-the-transition-process-between-adaptive-phases' into 'master'
|\  
| * 19bc340 -- Resolve "Improve the text in the modal window in the transition process between adaptive phases"
|/  
*   5dcd554 -- Merge branch '107-add-confirmation-for-deleting-instances' into 'master'
|\  
| * 04acc38 -- Resolve "Add confirmation for deleting instances"
* |   4d76117 -- Merge branch '102-fix-saving-discarding-of-changes-for-levels-phases' into 'master'
|\ \  
| |/  
|/|   
| * 517daae -- Resolve "Fix saving/discarding of changes for levels/phases"
|/  
*   feb0d00 -- Merge branch '103-add-missing-theme-styles-for-sentinel-markdown' into 'master'
|\  
| *   e2233bb -- Merge with latest changes
| |\  
| | *   7094223 -- Merge branch '92-rename-button-for-downloading-ssh-access' of gitlab.ics.muni.cz:muni-kypo-crp/frontend-angular/agendas/kypo-training-agenda into 92-rename-button-for-downloading-ssh-access
| | |\  
| | | * 6e7e4fc -- Remove unused import
| | | * 18c9685 -- Update ssh access buttons
| | * | a495d64 -- Remove unused import
| | * | 55f4648 -- Update ssh access buttons
| |/ /  
|/| |   
* | |   ae6f9bb -- Merge branch '105-fix-adaptive-questionnaire-ratining-form-questions' into 'master'
|\ \ \  
| * | | cb3418d -- Fix stepper, remove redundant array, fix rating forms
| | |/  
| |/|   
* | |   d6fde8d -- Merge branch '106-check-if-there-is-assigned-pool-when-downloading-management-access' into 'master'
|\ \ \  
| |/ /  
|/| |   
| * | 2d1a29f -- Disabled get ssh without pool
|/ /  
| * f3aaabf -- Move rating level select
| * 1618cef -- Add margin for markdown
| * 9a15055 -- Fix choices overflow
| * f38df4a -- Move delete question button
| * 6207292 -- Add markdown theme styles
|/  
*   144f367 -- Merge branch '95-use-stepper-for-questions-in-questionnaire-phase' into 'master'
|\  
| * 37c50b0 -- Resolve "Use stepper for questions in questionnaire phase"
* |   77a3886 -- Merge branch '92-rename-button-for-downloading-ssh-access' into 'master'
|\ \  
| |/  
|/|   
| * ea4bca6 -- Resolve "Rename button for downloading SSH access"
|/  
*   5f51e43 -- Merge branch '86-save-user-prefered-pagination-in-session' into 'master'
|\  
| * 235b1c5 -- Resolve "Save user prefered pagination in session"
|/  
*   18121d9 -- Merge branch '97-increase-the-separator-s-width-above-add-question-in-question-phase-relations' into 'master'
|\  
| * 0294f16 -- Resolve "Increase the separator's width above Add-Question in Question-Phase Relations"
|/  
*   e8881e7 -- Merge branch '101-specify-input-min-value-for-allowed-wrong-answers-commands-and-estimation-duration-in-training' into 'master'
|\  
| * 6a602dd -- Input min values specified for the allowed wrong answers, commands, and estimation duration.
|/  
*   5054495 -- Merge branch '96-rename-the-label-answer-to-correct-answer-in-the-tasks-of-training-phases' into 'master'
|\  
| * 07f7ac9 -- Label Answer renamed to Correct Answer.
* |   64cb89a -- Merge branch '100-modify-the-question-text-in-the-questionnaires-assessments-to-markdown' into 'master'
|\ \  
| |/  
|/|   
| * 6433541 -- Resolve "Modify the question text in the questionnaires/assessments to markdown"
|/  
*   038851f -- Merge branch '89-changes-in-one-free-form-question-propagate-to-all-others-in-assessment-level' into 'master'
|\  
| * c07e020 -- Resolve "Changes in one free form question propagate to all others in assessment level"
* |   430f379 -- Merge branch '90-clear-button-in-flag-field-in-training-run-not-working' into 'master'
|\ \  
| |/  
|/|   
| * 5fab08c -- Fixed flag clear button
|/  
*   f9b75f4 -- Merge branch '94-bump-version-of-sentinel' into 'master'
|\  
| * c0f6b63 -- Bump version of sentinel
|/  
*   8e6eeef -- Merge branch '91-provide-sanitize-function-for-markdown-editor-component' into 'master'
|\  
| * 49f0ef3 -- Resolve "Provide sanitize function for markdown-editor component"
|/  
*   010604e -- Merge branch '88-fix-local-config-paths' into 'master'
|\  
| * 3c6ea3c -- Fix paths
|/  
*   c8346d3 -- Merge branch '87-add-build-example-app-to-ci' into 'master'
|\  
| * 4c91f53 -- Add build example app
|/  
*   c5a1e07 -- Merge branch '84-use-stepper-for-questions-in-assessment-levels' into 'master'
|\  
| * f647f42 -- Resolve "Use stepper for questions in assessment levels"
* |   147155e -- Merge branch '85-set-maximum-size-for-adaptive-questionnaire-to-1023' into 'master'
|\ \  
| * | 073bb01 -- Resolve "Set maximum size for adaptive questionnaire to 1023"
|/ /  
* |   cd94c46 -- Merge branch '82-change-functionality-of-submit-button-for-flags' into 'master'
|\ \  
| |/  
|/|   
| * f52903a -- Resolve "Change functionality of submit button for flags"
|/  
* d793dfe -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 867bd95 -- [CI/CD] Update packages.json version based on GitLab tag.
*   0ecac50 -- Merge branch '80-add-loading-for-overview-visualization-and-fix-questionare-points' into 'master'
|\  
| * dad42c0 -- Resolve "Add loading for overview visualization and fix questionare points"
|/  
* dfb6e95 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 97891e5 -- [CI/CD] Update packages.json version based on GitLab tag.
*   3d58a8e -- Merge branch '81-simplify-gitlab-ci-cd-using-csirt-mu-docker-image' into 'master'
|\  
| * b1be3ab -- Update gitlab CI
|/  
* c764397 -- Update project package.json version based on GitLab tag. Done by CI
*   aa79008 -- Merge branch '79-bump-version-of-overview-visualization' into 'master'
|\  
| * e6eb1ac -- Bump overview visualization version
|/  
* f8a11e5 -- Update project package.json version based on GitLab tag. Done by CI
*   da1b525 -- Merge branch '78-bump-sentinel-layout-version' into 'master'
|\  
| * edd8903 -- Resolve "Bump sentinel layout version"
|/  
* 9b70cd2 -- Update project package.json version based on GitLab tag. Done by CI
*   5a1f207 -- Merge branch '77-bump-version-of-sentinel' into 'master'
|\  
| * 8d8f3c3 -- Resolve "Bump version of Sentinel"
|/  
* d6158db -- Update project package.json version based on GitLab tag. Done by CI
*   ff6c3f3 -- Merge branch '76-update-to-angular-12' into 'master'
|\  
| * d1cb42b -- Resolve "Update to Angular 12"
|/  
* 1ea1e2f -- Update project package.json version based on GitLab tag. Done by CI
*   d5ea5d5 -- Merge branch '75-task-and-matrix-inconsistencies-occur-after-phase-moves' into 'master'
|\  
| * 64eaa19 -- Matrix and tasks are correctly updated after each move
|/  
* 3b33cea -- Update project package.json version based on GitLab tag. Done by CI
*   bdf2f20 -- Merge branch 'fix-can-be-submitted-emi-question' into 'master'
|\  
| * 1f3cb34 -- Update extended-matching-items-trainee.component.ts
|/  
* 9f598d2 -- Update project package.json version based on GitLab tag. Done by CI
*   cfc269d -- Merge branch '74-bump-version-of-adaptive-training-visualization' into 'master'
|\  
| * ece2da6 -- Bump version of adaptive training visualization
* b82adfa -- Update project package.json version based on GitLab tag. Done by CI
### 12.0.5 Spinner for finished training runs, disable points for non test questions
* 867bd95 -- [CI/CD] Update packages.json version based on GitLab tag.
*   0ecac50 -- Merge branch '80-add-loading-for-overview-visualization-and-fix-questionare-points' into 'master'
|\  
| * dad42c0 -- Resolve "Add loading for overview visualization and fix questionare points"
|/  
* dfb6e95 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 97891e5 -- [CI/CD] Update packages.json version based on GitLab tag.
*   3d58a8e -- Merge branch '81-simplify-gitlab-ci-cd-using-csirt-mu-docker-image' into 'master'
|\  
| * b1be3ab -- Update gitlab CI
|/  
* c764397 -- Update project package.json version based on GitLab tag. Done by CI
*   aa79008 -- Merge branch '79-bump-version-of-overview-visualization' into 'master'
|\  
| * e6eb1ac -- Bump overview visualization version
|/  
* f8a11e5 -- Update project package.json version based on GitLab tag. Done by CI
*   da1b525 -- Merge branch '78-bump-sentinel-layout-version' into 'master'
|\  
| * edd8903 -- Resolve "Bump sentinel layout version"
|/  
* 9b70cd2 -- Update project package.json version based on GitLab tag. Done by CI
*   5a1f207 -- Merge branch '77-bump-version-of-sentinel' into 'master'
|\  
| * 8d8f3c3 -- Resolve "Bump version of Sentinel"
|/  
* d6158db -- Update project package.json version based on GitLab tag. Done by CI
*   ff6c3f3 -- Merge branch '76-update-to-angular-12' into 'master'
|\  
| * d1cb42b -- Resolve "Update to Angular 12"
|/  
* 1ea1e2f -- Update project package.json version based on GitLab tag. Done by CI
*   d5ea5d5 -- Merge branch '75-task-and-matrix-inconsistencies-occur-after-phase-moves' into 'master'
|\  
| * 64eaa19 -- Matrix and tasks are correctly updated after each move
|/  
* 3b33cea -- Update project package.json version based on GitLab tag. Done by CI
*   bdf2f20 -- Merge branch 'fix-can-be-submitted-emi-question' into 'master'
|\  
| * 1f3cb34 -- Update extended-matching-items-trainee.component.ts
|/  
* 9f598d2 -- Update project package.json version based on GitLab tag. Done by CI
*   cfc269d -- Merge branch '74-bump-version-of-adaptive-training-visualization' into 'master'
|\  
| * ece2da6 -- Bump version of adaptive training visualization
|/  
* b82adfa -- Update project package.json version based on GitLab tag. Done by CI
*   53a32b7 -- Merge branch 'remove-forgotten-local-packages' into 'master'
|\  
| * 390c835 -- Local packages deleted.
|/  
*   88e8734 -- Merge branch '64-adjust-the-components-of-the-assessment-questions-according-to-the-new-design-of-backend-objects' into 'master'
|\  
| * c195ee9 -- Resolve "Adjust the components of the assessment questions according to the new design of backend objects"
|/  
* ed06ab0 -- Update project package.json version based on GitLab tag. Done by CI
*   ec0bd7d -- Merge branch '71-remove-preview-option-from-adaptive-td-overview-remove-unnecessary-string-from-decision-matrix' into 'master'
|\  
| * 0d4b348 -- Removed preview from adaptive TD, removed unwanted text
|/  
* 972ca22 -- Update project package.json version based on GitLab tag. Done by CI
*   6c8c6b8 -- Merge branch '72-bump-version-of-hurdling-visualization' into 'master'
|\  
| * ad7fe04 -- Resolve "Bump version of hurdling visualization"
|/  
* af09c32 -- Update project package.json version based on GitLab tag. Done by CI
*   e15e4df -- Merge branch '70-bump-training-api-version-to-11-1-1' into 'master'
|\  
| * 629ec76 -- training api bumped
* | a50f4e4 -- Update project package.json version based on GitLab tag. Done by CI
|/  
* 8a158c5 -- Update project package.json version based on GitLab tag. Done by CI
*   edaf398 -- Merge branch '69-change-matrix-desription' into 'master'
|\  
| * 214f2d1 -- Resolve "Change Matrix desription"
|/  
*   b5d54a5 -- Merge branch '68-fix-bugs-found-at-alpha-testing-session' into 'master'
|\  
| * ac6452d -- fix component declaration
| * fc22d63 -- Draft: fix dialog import error
| * 9155a16 -- Fix lint errors
| * b68e6f0 -- Decision matrix updated
| * 7ef4e67 -- Loading dialog between phases
| * 3382b37 -- DM labels fixed
| * a5fcaa0 -- css issues fixed
|/  
* cb232fd -- Update project package.json version based on GitLab tag. Done by CI
*   8cdf727 -- Merge branch '67-disable-submit-answer-button-after-clicking-in-adaptive-runs' into 'master'
|\  
| * 45da7b1 -- Resolve "Disable submit answer button after clicking in adaptive runs"
|/  
* e770c29 -- Update project package.json version based on GitLab tag. Done by CI
*   c3c4120 -- Merge branch '66-adaptive-questionare-submit' into 'master'
|\  
| * 59165c3 -- Disabled button on loading
|/  
* ccd4263 -- Update project package.json version based on GitLab tag. Done by CI
*   bd50089 -- Merge branch '65-fix-package-lock' into 'master'
|\  
| * 16de6e2 -- Resolve "FIx package lock"
|/  
* 4156a36 -- Update project package.json version based on GitLab tag. Done by CI
*   7811eaf -- Merge branch '63-integrate-adaptive-learning-techniques' into 'master'
|\  
| * ee16874 -- Resolve "Integrate Adaptive learning techniques"
|/  
*   1d1531d -- Merge branch '60-update-datetime-picker' into 'master'
|\  
| * ca7d4b9 -- Update date-time-picker to latest version that supports Angular 11
* |   52d214b -- Merge branch '62-update-oidc-configuration' into 'master'
|\ \  
| |/  
|/|   
| * c7c9e11 -- Resolve "Update oidc configuration"
|/  
* 1a344f0 -- Update project package.json version based on GitLab tag. Done by CI
*   2d9d8a3 -- Merge branch '61-fix-active-hint-selection-in-hint-stepper' into 'master'
|\  
| * a257ab7 -- Resolve "Fix active hint selection in hint stepper"
|/  
* ec77dea -- Update project package.json version based on GitLab tag. Done by CI
*   d610dd2 -- Merge branch '59-update-to-angular-11' into 'master'
|\  
| * 83727c3 -- Resolve "Update to Angular 11"
|/  
*   1974c65 -- Merge branch '58-recreate-package-lock-for-new-package-registry' into 'master'
|\  
| * 0d7871c -- recreate package lock
|/  
*   f89929c -- Merge branch '57-migrate-from-tslint-to-eslint' into 'master'
|\  
| * a3d1a35 -- Resolve "Migrate from tslint to eslint"
|/  
* 603d311 -- Update project package.json version based on GitLab tag. Done by CI
*   c737aee -- Merge branch '56-rename-package-scope-to-muni-kypo-crp' into 'master'
|\  
| * 8deb3f6 -- Resolve "Rename package scope to muni-kypo-crp"
* 6eddecc -- Update project package.json version based on GitLab tag. Done by CI
### 12.0.4 Update gitlab CI
* 97891e5 -- [CI/CD] Update packages.json version based on GitLab tag.
*   3d58a8e -- Merge branch '81-simplify-gitlab-ci-cd-using-csirt-mu-docker-image' into 'master'
|\  
| * b1be3ab -- Update gitlab CI
|/  
* c764397 -- Update project package.json version based on GitLab tag. Done by CI
*   aa79008 -- Merge branch '79-bump-version-of-overview-visualization' into 'master'
|\  
| * e6eb1ac -- Bump overview visualization version
|/  
* f8a11e5 -- Update project package.json version based on GitLab tag. Done by CI
*   da1b525 -- Merge branch '78-bump-sentinel-layout-version' into 'master'
|\  
| * edd8903 -- Resolve "Bump sentinel layout version"
|/  
* 9b70cd2 -- Update project package.json version based on GitLab tag. Done by CI
*   5a1f207 -- Merge branch '77-bump-version-of-sentinel' into 'master'
|\  
| * 8d8f3c3 -- Resolve "Bump version of Sentinel"
|/  
* d6158db -- Update project package.json version based on GitLab tag. Done by CI
*   ff6c3f3 -- Merge branch '76-update-to-angular-12' into 'master'
|\  
| * d1cb42b -- Resolve "Update to Angular 12"
|/  
* 1ea1e2f -- Update project package.json version based on GitLab tag. Done by CI
*   d5ea5d5 -- Merge branch '75-task-and-matrix-inconsistencies-occur-after-phase-moves' into 'master'
|\  
| * 64eaa19 -- Matrix and tasks are correctly updated after each move
|/  
* 3b33cea -- Update project package.json version based on GitLab tag. Done by CI
*   bdf2f20 -- Merge branch 'fix-can-be-submitted-emi-question' into 'master'
|\  
| * 1f3cb34 -- Update extended-matching-items-trainee.component.ts
|/  
* 9f598d2 -- Update project package.json version based on GitLab tag. Done by CI
*   cfc269d -- Merge branch '74-bump-version-of-adaptive-training-visualization' into 'master'
|\  
| * ece2da6 -- Bump version of adaptive training visualization
|/  
* b82adfa -- Update project package.json version based on GitLab tag. Done by CI
*   53a32b7 -- Merge branch 'remove-forgotten-local-packages' into 'master'
|\  
| * 390c835 -- Local packages deleted.
|/  
*   88e8734 -- Merge branch '64-adjust-the-components-of-the-assessment-questions-according-to-the-new-design-of-backend-objects' into 'master'
|\  
| * c195ee9 -- Resolve "Adjust the components of the assessment questions according to the new design of backend objects"
|/  
* ed06ab0 -- Update project package.json version based on GitLab tag. Done by CI
*   ec0bd7d -- Merge branch '71-remove-preview-option-from-adaptive-td-overview-remove-unnecessary-string-from-decision-matrix' into 'master'
|\  
| * 0d4b348 -- Removed preview from adaptive TD, removed unwanted text
|/  
* 972ca22 -- Update project package.json version based on GitLab tag. Done by CI
*   6c8c6b8 -- Merge branch '72-bump-version-of-hurdling-visualization' into 'master'
|\  
| * ad7fe04 -- Resolve "Bump version of hurdling visualization"
|/  
* af09c32 -- Update project package.json version based on GitLab tag. Done by CI
*   e15e4df -- Merge branch '70-bump-training-api-version-to-11-1-1' into 'master'
|\  
| * 629ec76 -- training api bumped
* | a50f4e4 -- Update project package.json version based on GitLab tag. Done by CI
|/  
* 8a158c5 -- Update project package.json version based on GitLab tag. Done by CI
*   edaf398 -- Merge branch '69-change-matrix-desription' into 'master'
|\  
| * 214f2d1 -- Resolve "Change Matrix desription"
|/  
*   b5d54a5 -- Merge branch '68-fix-bugs-found-at-alpha-testing-session' into 'master'
|\  
| * ac6452d -- fix component declaration
| * fc22d63 -- Draft: fix dialog import error
| * 9155a16 -- Fix lint errors
| * b68e6f0 -- Decision matrix updated
| * 7ef4e67 -- Loading dialog between phases
| * 3382b37 -- DM labels fixed
| * a5fcaa0 -- css issues fixed
|/  
* cb232fd -- Update project package.json version based on GitLab tag. Done by CI
*   8cdf727 -- Merge branch '67-disable-submit-answer-button-after-clicking-in-adaptive-runs' into 'master'
|\  
| * 45da7b1 -- Resolve "Disable submit answer button after clicking in adaptive runs"
|/  
* e770c29 -- Update project package.json version based on GitLab tag. Done by CI
*   c3c4120 -- Merge branch '66-adaptive-questionare-submit' into 'master'
|\  
| * 59165c3 -- Disabled button on loading
|/  
* ccd4263 -- Update project package.json version based on GitLab tag. Done by CI
*   bd50089 -- Merge branch '65-fix-package-lock' into 'master'
|\  
| * 16de6e2 -- Resolve "FIx package lock"
|/  
* 4156a36 -- Update project package.json version based on GitLab tag. Done by CI
*   7811eaf -- Merge branch '63-integrate-adaptive-learning-techniques' into 'master'
|\  
| * ee16874 -- Resolve "Integrate Adaptive learning techniques"
|/  
*   1d1531d -- Merge branch '60-update-datetime-picker' into 'master'
|\  
| * ca7d4b9 -- Update date-time-picker to latest version that supports Angular 11
* |   52d214b -- Merge branch '62-update-oidc-configuration' into 'master'
|\ \  
| |/  
|/|   
| * c7c9e11 -- Resolve "Update oidc configuration"
|/  
* 1a344f0 -- Update project package.json version based on GitLab tag. Done by CI
*   2d9d8a3 -- Merge branch '61-fix-active-hint-selection-in-hint-stepper' into 'master'
|\  
| * a257ab7 -- Resolve "Fix active hint selection in hint stepper"
|/  
* ec77dea -- Update project package.json version based on GitLab tag. Done by CI
*   d610dd2 -- Merge branch '59-update-to-angular-11' into 'master'
|\  
| * 83727c3 -- Resolve "Update to Angular 11"
|/  
*   1974c65 -- Merge branch '58-recreate-package-lock-for-new-package-registry' into 'master'
|\  
| * 0d7871c -- recreate package lock
|/  
*   f89929c -- Merge branch '57-migrate-from-tslint-to-eslint' into 'master'
|\  
| * a3d1a35 -- Resolve "Migrate from tslint to eslint"
|/  
* 603d311 -- Update project package.json version based on GitLab tag. Done by CI
*   c737aee -- Merge branch '56-rename-package-scope-to-muni-kypo-crp' into 'master'
|\  
| * 8deb3f6 -- Resolve "Rename package scope to muni-kypo-crp"
|/  
* 6eddecc -- Update project package.json version based on GitLab tag. Done by CI
*   65f2a5b -- Merge branch '55-update-dependencies-to-new-format' into 'master'
|\  
| * 6963ab6 -- Resolve "Update dependencies to new format"
|/  
* 8875017 -- Update project package.json version based on GitLab tag. Done by CI
* bfacc94 -- Merge branch '54-rename-package-to-kypo-training-agenda' into 'master'
