Citywide Dashboard Editor
=========================

It would be better to provide more of a README here, but for now: because of
Citywide Dashboard itself not being written in React, this is an attempt to
provide a small React application that provides editing of the Citywide Dashboard
database.
Currently, we only provide editing of messages, but in the future more parts may
move over to this system.
In the end, the goal is to possibly use this as a vehicle toward rewriting the
entirety in React.

The guide used to Dockerize this is [here](https://mherman.org/blog/dockerizing-a-react-app/).

Efficiency
----------

Be aware that the codebase is not efficient, and does some weird things in order
to avoid those inefficiencies.
For example, the linking of the password field between the upload dialog and the main page
should be linked in state, but instead a weird `onBlur` hack is used to save efficiency.
Cleaning up the codebase is being pushed off for now, but will probably be necessary
later on in order to further develop this.
