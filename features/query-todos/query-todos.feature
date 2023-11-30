Feature: Todo List Management

	Scenario: Fetch a todo
		Given the system has todos
		When the user requests the todo with id "c29e1c07-a3f7-444a-9a30-47b0378737f8"
		Then the system should return the todo

#	Scenario: Filter todos by status (done or not done)
#		Given the system has todos
#		And the todos include both done and not done items
#		When the user filters todos by status
#		Then the system should return only todos matching the specified status
#
#	Scenario: Filter todos by keyword
#		Given the system has todos
#		And the todos include items with different keywords
#		When the user filters todos by a specific keyword
#		Then the system should return only todos matching the specified keyword
