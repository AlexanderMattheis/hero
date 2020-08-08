<img src="https://github.com/AlexanderMattheis/hero/blob/master/hero_full.png" width="576" height="192">

# Hero

You like quiz shows like "Who Wants to be a Millionaire"? If the correct answer is 'yes' and you want to play a similar game, you're in the right place. Hero is a game that you can play against others or in singleplayer mode.

<img src="https://github.com/AlexanderMattheis/hero/blob/master/pics/ingame.png" width="800" height="450">

Each player or team gets always the same number of questions. 
In this way, each team can earn the same number of points for correct answers.
If a player or team has answered on a question then it's the turn of the next player.
The questions can be stored in ``*.xml``-files you find 
in the ``input``-folder of the game. So, you can also create your own files
for different question-categories.

## Getting started

At the beginning you have to choose the number of teams or players 
you wanna play with. Therefore, you can use the ``up``- 
and ``down``-arrow-keys of your keyboard or just use your mouse to click 
on the ``up``- and ``down``-spinners. Afterwards, 
press the ``Enter``-key to confirm the selected number of teams.

When the game starts, all questions from all files are put together
and then uniformly a question is selected from the set of all questions.
After answering on a question, the question is removed from the set 
of all questions.

### Controls

| Control   | Action                     |
|:--------- |:-------------------------- |
| ``A``     | selects/deselects option A |
| ``B``     | selects/deselects option B |
| ``C``     | selects/deselects option C |
| ``D``     | selects/deselects option D |
| ``Enter`` | confirms selected options  |
| ``F11``   | switches fullscreen mode*  |

To enlarge the texts of the main screen, you can use the slider on the top right or use your mouse wheel.

\* read [Known Issues](#known-issues)

### Status Window

In multiplayer, after answering a question, a status window will appear, showing the number of points earned for a question. The status window will also be displayed if a question has been answered incorrectly in singleplayer mode. At the end of the game, the status window shows the winning teams with their number of collected points and a button to restart the game.

## Known Issues

#### Taskbar Appears in Fullscreen Mode

On Microsoft Windows 10, the taskbar gets displayed in fullscreen mode when the ingame status window gets enabled. To solve the problem, right-click on the Windows taskbar and select ``Taskbar Settings``. Activate the option `` Automatically hide the taskbar in desktop mode``.

<img src="https://github.com/AlexanderMattheis/hero/blob/master/pics/activate_auto_hide_in_desktop_mode.PNG" width="800" height="625">
