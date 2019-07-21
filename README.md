<img src="https://github.com/AlexanderMattheis/hero/blob/master/hero_logo.PNG" width="256" height="256">

# Hero
You like quiz shows like "Who Wants to Be a Millionaire"?
If the correct answer is 'yes' and you wanna play a similar game,
then you are at the right place. Hero is a game which you can play against
others or in a singleplayer mode.

<img src="https://github.com/AlexanderMattheis/hero/blob/master/pics/ingame.PNG" width="800" height="450">

Each player or team gets always the same amount of questions 
and such that each team can earn the same amount of points for correct answers.
If a player or team answers on a question then it's the turn of the next player.
The questions can be stored in ``*.xml``-files you find 
in the ``input``-folder of the game. So, you can also create your own files
for different question-categories.

## Getting started
At the beginning you have to choose the number of teams or players 
you wanna play with. Therefore, you can use the ``up``- 
and ``down``-arrow-keys of your keyboard or just your mouse to click 
on the ``up``- and ``down``-spinners. Afterwards, 
press the ``Enter``-key to confirm the selected number of teams.

When the game starts, all questions from all files are put together
and then uniformly a question is selected from the set of all questions.
After answering on a question, the question is removed from the set 
of all questions.
 
### Controls
| Control      | Action                          |
|:-------------|:--------------------------------|
| ``A``        | selects/deselects option A      |
| ``B``        | selects/deselects option B      |
| ``C``        | selects/deselects option C      |
| ``D``        | selects/deselects option D      |
| ``Enter``    | confirms selected options       |
| ``F11``      | switches fullscreen mode*       |

To enlarge the main-screen texts, you can grab the slider-button on the top-right or
use the mouse wheel.

\* read [Known Issues](#known-issues)

### Status Window
In the multiplayer, a status window appears after answering on a question
to show you the number of earned points for a question. This status window also
appears if a question is incorrectly answered in the singleplayer 
to show you the correct answer. When the game ends, the status window
shows the winner teams with the number of points they've earned
and a button to restart the game.

## Known Issues
#### Taskbar Appears in Fullscreen Mode 
On Microsoft Windows 10, the taskbar appears in the fullscreen mode when
the game internal status window is activated. To solve the problem just
right-click on the Windows taskbar and select ``Taskbar settings``.
Activate the option ``Automatically hide the taskbar in desktop mode``.

<img src="https://github.com/AlexanderMattheis/hero/blob/master/pics/activate_auto_hide_in_desktop_mode.PNG" width="800" height="625">
