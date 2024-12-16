function fish_prompt -d "Write out the prompt"
    # This shows up as USER@HOST /home/user/ >, with the directory colored
    # $USER and $hostname are set by fish, so you can just use them
    # instead of using `whoami` and `hostname`
    printf '%s@%s %s%s%s > ' $USER $hostname \
        (set_color $fish_color_cwd) (prompt_pwd) (set_color normal)
end

if status is-interactive
    # Commands to run in interactive sessions can go here
    set fish_greeting
    #fastfetch --logo endeavouros_small
end

set parent "$(ps -o ppid= -p $fish_pid | string trim)";
set parent "$(ps -o comm= -p $parent)";
if test $parent = "warp"
    fastfetch --logo endeavouros_small
end

starship init fish | source
if test -f ~/.colourscheme.txt
    cat ~/.colourscheme.txt
    clear
end

alias pamcan=pacman

# function fish_prompt
#   set_color cyan; echo (pwd)
#   set_color green; echo '> '
# end
#
fish_add_path "/home/robert/.cargo/bin"
fish_add_path "/home/robert/.config/fish/scripts"


# BEGIN opam configuration
# This is useful if you're using opam as it adds:
#   - the correct directories to the PATH
#   - auto-completion for the opam binary
# This section can be safely removed at any time if needed.
test -r '/home/robert/.opam/opam-init/init.fish' && source '/home/robert/.opam/opam-init/init.fish' > /dev/null 2> /dev/null; or true
# END opam configuration

fish_add_path /home/robert/rust_progs/
#fish_add_path /home/robert/.config/hypr/scripts/
fish_add_path /home/robert/.local/bin/
fish_add_path /home/robert/.local/share/gem/ruby/3.3.0/bin

alias power=powerprofilesctl
set -ge EDITOR nvim
